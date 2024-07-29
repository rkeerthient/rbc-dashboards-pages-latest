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

const SortableItem: React.FC<SortableItemProps> = ({ item, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.title });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1, // Make the original item invisible when dragging
    height: isDragging ? "auto" : undefined, // Maintain height when dragging
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
        <ul className="pl-8 pr-4 pb-4 space-y-2">
          {item.page?.map((subPage) => (
            <li
              key={subPage.meta.id}
              className="flex items-center justify-between"
            >
              <span>{subPage.c_pageTitle}</span>
              <a
                href={subPage.slug}
                className="px-2.5 py-1.5 text-sm font-semibold text-gray-900 bg-white rounded shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Go To Page
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DraggingItem: React.FC<SortableItemProps> = ({ item }) => {
  // This component is used for the drag overlay
  return (
    <div className="border-t bg-white shadow-lg">
      <div className="flex items-center p-4">
        <div className="mr-2">
          <GripVertical size={16} />
        </div>
        <span>{item.title}</span>
      </div>
      <ul className="pl-8 pr-4 pb-4 space-y-2">
        {item.page?.map((subPage) => (
          <li
            key={subPage.meta.id}
            className="flex items-center justify-between"
          >
            <span>{subPage.c_pageTitle}</span>
            <a
              href={subPage.slug}
              className="px-2.5 py-1.5 text-sm font-semibold text-gray-900 bg-white rounded shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Go To Page
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const DndNavigation: React.FC<DndNavigationProps> = ({
  items,
  onOrderChange,
}) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.title === active.id);
      const newIndex = items.findIndex((item) => item.title === over?.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onOrderChange(newItems);
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
          <DraggingItem item={items.find((item) => item.title === activeId)!} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
