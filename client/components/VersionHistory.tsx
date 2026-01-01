import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { versionHistory, VersionEntry } from '../../packages/iconza/src/versionHistory';
import { IconCalendar, IconTag, IconCodePlus, IconRefresh, IconBug, IconX } from "@tabler/icons-react";
import { Timeline } from './Timeline';
import { Icon } from "iconza";

interface VersionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const usePreventBodyScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);
};

const useEscapeKey = (onClose: () => void) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'added': return <IconCodePlus size={20} className="text-asset" />;
    case 'updated': return <IconRefresh size={20} className="text-secondary" />;
    case 'fixed': return <IconBug size={20} className="text-amber-500" />;
    default: return <IconCodePlus size={20} className="text-gray-500" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'added': return 'bg-asset/10 text-asset border-asset/20';
    case 'updated': return 'bg-secondary/10 text-secondary border-secondary/20';
    case 'fixed': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  }
};

export const VersionHistory = ({ isOpen, onClose }: VersionHistoryProps) => {
  usePreventBodyScroll(isOpen);
  useEscapeKey(onClose);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-800 py-4 px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <IconTag className="h-6 w-6 text-secondary" />
                  <div>
                    <span className="text-2xl font-semibold text-white">Version History</span>
                    <p className="text-gray-400">See what's new in each update</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close version history"
                >
                  <IconX size={20} className="transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
              <Timeline data={transformToTimelineEntries(versionHistory)} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const transformToTimelineEntries = (versions: VersionEntry[]) => {
  return versions.map(version => ({
    title: (
      <span className={version.date === versionHistory[0].date ? "text-primary" : "text-neutral-400"}>
        {new Date(version.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </span>
    ),
    content: (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <div className="text-neutral-400 text-sm">
            <IconCalendar className="h-4 w-4 inline-block mr-1" />
            Version {version.version}
          </div>
          {version.date === versionHistory[0].date && (
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-md border border-primary/20">
              Latest
            </span>
          )}
        </div>

        <div className="space-y-4">
          {version.changes.map((change, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
              <div className="flex items-center gap-2 mb-3">
                {getTypeIcon(change.type)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(change.type)}`}>
                  {change.type.charAt(0).toUpperCase() + change.type.slice(1)}
                </span>
                <span className="text-sm text-neutral-400">{change.category}</span>
              </div>

              <p className="text-neutral-200 text-sm">{change.description}</p>

              {change.icons && change.icons.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {change.icons.map((iconName) => (
                    <div
                      key={iconName}
                      title={iconName}
                    >
                      <Icon
                        name={iconName}
                        size={24}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
  }));
};