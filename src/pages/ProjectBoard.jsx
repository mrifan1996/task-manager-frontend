import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialColumns = {
  todo: {
    name: "To Do",
    items: [
      { id: "todo-task-1", content: "Setup project repository" },
      { id: "todo-task-2", content: "Design database schema" },
    ],
  },
  inprogress: {
    name: "In Progress",
    items: [{ id: "inprogress-task-3", content: "Create React frontend" }],
  },
  done: {
    name: "Done",
    items: [{ id: "done-task-4", content: "Initialize backend repo" }],
  },
};

export default function ProjectBoard() {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId];
      const copiedItems = Array.from(column.items);
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    } else {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destColumn.items);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  return (
    <div className="flex gap-6 p-6 max-w-7xl mx-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([columnId, column]) => (
          <div
            key={columnId}
            className="flex flex-col bg-gray-100 rounded p-4 w-72"
          >
            <h2 className="font-bold text-lg mb-4">{column.name}</h2>
            <Droppable droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`min-h-[200px] p-2 rounded ${
                    snapshot.isDraggingOver ? "bg-blue-100" : ""
                  }`}
                >
                  {column.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            userSelect: "none",
                            padding: 12,
                            marginBottom: 8,
                            borderRadius: 4,
                            boxShadow: snapshot.isDragging
                              ? "0 2px 8px rgba(0,0,0,0.2)"
                              : "none",
                            backgroundColor: snapshot.isDragging
                              ? "#D1E8FF"
                              : "#FFF",
                            cursor: "grab",
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
}
