import { AnimatePresence, motion } from 'framer-motion';
import { IconItem } from './IconItem';
import { IconEmptyState } from './IconEmptyState';
import { icons } from '../../../../packages/iconza/src';

export function IconGrid({ category, size, query, data, viewMode }) {
  const visible = data.filter((i) => category === 'All' || i.category === category);

  if (!visible.length) return <IconEmptyState query={query} />;

  const gridClasses =
    viewMode === 'grid'
      ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-3 sm:gap-4'
      : 'flex flex-col gap-2';

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={category + query + viewMode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={gridClasses}
      >
        {visible.map((i) => {
          const Comp = icons[i.name];
          return Comp ? (
            <motion.div
              key={i.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <IconItem
                name={i.name}
                Comp={Comp}
                size={size}
                viewMode={viewMode}
                category={i.category}
                keywords={i.keywords}
                sourceUrl={i.sourceUrl}
              />
            </motion.div>
          ) : null;
        })}
      </motion.div>
    </AnimatePresence>
  );
}
