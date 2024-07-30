import * as React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { HeaderPage } from "../../types/yext";

import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface DndNavigationProps {
  items: HeaderPage[];
  onOrderChange: (newItems: HeaderPage[]) => void;
}

interface SortableItemProps {
  item: HeaderPage;
  isDragging?: boolean;
}

interface DraggableSubItemProps {
  subPage: HeaderPage["page"][0];
  parentId: string;
}

const DraggableSubItem: React.FC<DraggableSubItemProps> = ({
  subPage,
  parentId,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: `${parentId}-${subPage.meta.id}`,
      data: { type: "subItem", parentId, subPage },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center justify-between"
    >
      <div className="flex items-center">
        <div {...listeners} className="mr-2 cursor-move">
          <GripVertical size={16} />
        </div>
        <span>{subPage.c_pageTitle}</span>
      </div>
      <a
        href={subPage.slug}
        className="px-2.5 py-1.5 text-sm font-semibold text-gray-900 bg-white rounded shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Go To Page
      </a>
    </li>
  );
};

const SortableItem: React.FC<SortableItemProps> = ({ item, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.title,
      data: { type: "item", item },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? "auto" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="border-t">
        <div className="flex items-center p-4 cursor-pointer">
          <div {...listeners} className="mr-2 cursor-move">
            <GripVertical size={16} />
          </div>
          <span>{item.title}</span>
        </div>
        <SortableContext
          items={
            item.page?.map((subPage) => `${item.title}-${subPage.meta.id}`) ||
            []
          }
          strategy={verticalListSortingStrategy}
        >
          <ul className="pl-8 pr-4 pb-4 space-y-2">
            {item.page?.map((subPage) => (
              <DraggableSubItem
                key={subPage.meta.id}
                subPage={subPage}
                parentId={item.title}
              />
            ))}
          </ul>
        </SortableContext>
      </div>
    </div>
  );
};

const DraggingItem: React.FC<{
  item: HeaderPage | HeaderPage["page"][0];
  type: "item" | "subItem";
}> = ({ item, type }) => {
  if (type === "subItem") {
    const subPage = item as HeaderPage["page"][0];
    console.log(subPage);
    return (
      <div className="flex items-center justify-between bg-white shadow-lg p-2">
        <span>{subPage.c_pageTitle}</span>
        <a
          href={subPage.slug}
          className="px-2.5 py-1.5 text-sm font-semibold text-gray-900 bg-white rounded shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Go To Page
        </a>
      </div>
    );
  }

  const headerPage = item as HeaderPage;
  return (
    <div className="border-t bg-white shadow-lg">
      <div className="flex items-center p-4">
        <div className="mr-2">
          <GripVertical size={16} />
        </div>
        <span>{headerPage.title}</span>
      </div>
    </div>
  );
};

export const DndNavigation: React.FC<DndNavigationProps> = ({
  items,
  onOrderChange,
}) => {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const activeData = active.data.current;
      const overData = over.data.current;

      if (activeData?.type === "item" && overData?.type === "item") {
        // Reordering top-level items
        const oldIndex = items.findIndex((item) => item.title === active.id);
        const newIndex = items.findIndex((item) => item.title === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        onOrderChange(newItems);
      } else if (activeData?.type === "subItem") {
        const activeParentId = activeData.parentId;
        const activeSubPage = activeData.subPage;
        let newItems = [...items];

        // Remove subPage from its original parent
        const oldParentIndex = newItems.findIndex(
          (item) => item.title === activeParentId
        );
        newItems[oldParentIndex].page = newItems[oldParentIndex].page?.filter(
          (subPage) => subPage.meta.id !== activeSubPage.meta.id
        );

        if (overData?.type === "item") {
          // Moving subItem to a new parent
          const newParentIndex = newItems.findIndex(
            (item) => item.title === over.id
          );
          newItems[newParentIndex].page = [
            ...(newItems[newParentIndex].page || []),
            activeSubPage,
          ];
        } else if (overData?.type === "subItem") {
          // Reordering within the same parent or moving to a new parent
          const newParentId = overData.parentId;
          const newParentIndex = newItems.findIndex(
            (item) => item.title === newParentId
          );
          const newSubPageIndex = newItems[newParentIndex].page?.findIndex(
            (subPage) => subPage.meta.id === overData.subPage.meta.id
          );

          if (newSubPageIndex !== undefined && newSubPageIndex >= 0) {
            newItems[newParentIndex].page?.splice(
              newSubPageIndex,
              0,
              activeSubPage
            );
          } else {
            newItems[newParentIndex].page = [
              ...(newItems[newParentIndex].page || []),
              activeSubPage,
            ];
          }
        }

        onOrderChange(newItems);
      }
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={items.map((item) => item.title)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {items.map((item) => (
            <SortableItem
              key={item.title}
              item={item}
              isDragging={activeId === item.title}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId ? (
          <DraggingItem
            item={
              items.find((item) => item.title === activeId) ||
              items
                .flatMap((item) => item.page || [])
                .find(
                  (subPage) =>
                    `${subPage.meta.id}` ===
                    activeId
                      .toString()
                      .slice(activeId.toString().indexOf("-") + 1)
                ) ||
              items[0]
            }
            type={
              typeof activeId === "string" && activeId.includes("-")
                ? "subItem"
                : "item"
            }
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
