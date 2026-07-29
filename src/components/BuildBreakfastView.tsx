import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DndContext, useDraggable, useDroppable, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
}

const availableItems: Item[] = [
  { id: 'item1', name: 'Item 1', price: 1000, image: 'https://i.ibb.co/kgptDWN3/Layer-10.png' },
  { id: 'item2', name: 'Item 2', price: 1500, image: 'https://i.ibb.co/N2D7jPd3/Layer-9.png' },
  { id: 'item3', name: 'Item 3', price: 500, image: 'https://i.ibb.co/jPTbVcnv/Layer-8.png' },
  { id: 'item4', name: 'Item 4', price: 1200, image: 'https://i.ibb.co/8tw6PRp/Layer-7.png' },
  { id: 'item5', name: 'Item 5', price: 800, image: 'https://i.ibb.co/60cYWRZp/Layer-6.png' },
  { id: 'item6', name: 'Item 6', price: 2000, image: 'https://i.ibb.co/1fdvTyxJ/Layer-5.png' },
  { id: 'item7', name: 'Item 7', price: 300, image: 'https://i.ibb.co/0pTP28FM/Layer-4.png' },
  { id: 'item8', name: 'Item 8', price: 700, image: 'https://i.ibb.co/Ps6Fv8Gx/Layer-3.png' },
  { id: 'item9', name: 'Item 9', price: 1100, image: 'https://i.ibb.co/GQsRJ704/Layer-2.png' },
  { id: 'item10', name: 'Item 10', price: 900, image: 'https://i.ibb.co/nsvpXZ4c/Layer-17.png' },
  { id: 'item11', name: 'Item 11', price: 600, image: 'https://i.ibb.co/zhT63snT/Layer-16.png' },
  { id: 'item12', name: 'Item 12', price: 1300, image: 'https://i.ibb.co/b5Fw5hnS/Layer-15.png' },
  { id: 'item13', name: 'Item 13', price: 400, image: 'https://i.ibb.co/p6xwRQqF/Layer-14.png' },
  { id: 'item14', name: 'Item 14', price: 1000, image: 'https://i.ibb.co/hJqPTm37/Layer-13.png' },
  { id: 'item15', name: 'Item 15', price: 1400, image: 'https://i.ibb.co/7tJqmDJq/Layer-11.png' },
  { id: 'item16', name: 'Item 16', price: 500, image: 'https://i.ibb.co/0jgqCvD8/Layer-12.png' },
];

const DraggableItem: React.FC<{ item: Item }> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.05 }}
      className="p-2 cursor-grab flex flex-col items-center"
    >
      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
    </motion.div>
  );
}

export default function BuildBreakfastView() {
  const [itemsOnDish, setItemsOnDish] = useState<Item[]>([]);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const { setNodeRef } = useDroppable({
    id: 'dish',
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && over.id === 'dish') {
      const item = active.data.current as Item;
      setItemsOnDish([...itemsOnDish, { ...item, id: `${item.id}-${Date.now()}` }]);
    }
  };

  const totalPrice = itemsOnDish.reduce((sum, item) => sum + item.price, 0);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <motion.div
        key="build-breakfast-view"
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: -30 }}
        className="w-full h-screen overflow-hidden p-8"
      >
        <h2 className="text-3xl font-serif italic mb-8">Build your own breakfast</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-6">
              <h3 className="text-xl font-medium mb-4">Available Items</h3>
              <div className="grid grid-cols-2 gap-4">
                  {availableItems.map(item => (
                      <DraggableItem key={item.id} item={item} />
                  ))}
              </div>
          </div>

          <div className="glass rounded-3xl p-6 flex flex-col">
              <h3 className="text-xl font-medium mb-4">Your Dish</h3>
              <div ref={setNodeRef} className="w-full aspect-square rounded-full flex flex-wrap items-center justify-center p-4 overflow-y-auto" style={{ backgroundImage: 'url(https://i.ibb.co/k28PYvtJ/Layer-1.png)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                  {itemsOnDish.length === 0 && <p className="opacity-40">Drag items here</p>}
                  {itemsOnDish.map((item, index) => (
                      <div key={index} className="m-2 p-1 flex flex-col items-center">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                      </div>
                  ))}
              </div>
              <div className="mt-6">
                  <p className="text-lg font-bold">Total: {totalPrice} IQD</p>
              </div>
          </div>
        </div>
      </motion.div>
    </DndContext>
  );
}
