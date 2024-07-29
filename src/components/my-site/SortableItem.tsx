import * as React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface DraggableItemProps {
  id: string;
  children: React.ReactNode;
  isDndMode: boolean;
}

const DraggableItem = ({ id, children, isDndMode }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-center">
        {isDndMode && (
          <div {...listeners} className="mr-2 cursor-move">
            <GripVertical size={16} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default DraggableItem;
