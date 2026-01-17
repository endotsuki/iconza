import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
}

export function Loading({ className }: LoadingProps) {
  return (
    <div className={cn('fixed inset-0 z-50', 'flex items-center justify-center', 'bg-black/10 backdrop-blur-sm', className)}>
      <div className='spinner'>
        {[...Array(6)].map((_, i) => (
          <div key={i} className='spinner-face' />
        ))}
      </div>

      <style>{`
        .spinner {
          width: 44px;
          height: 44px;
          animation: spinner-rotate 2s infinite ease;
          transform-style: preserve-3d;
        }

        .spinner-face {
          background-color: rgba(0, 0, 0, 0.1);
          height: 100%;
          position: absolute;
          width: 100%;
          border: 1px solid #3B82F6;
        }

        .spinner-face:nth-of-type(1) {
          transform: translateZ(-22px) rotateY(180deg);
        }

        .spinner-face:nth-of-type(2) {
          transform: rotateY(-270deg) translateX(50%);
          transform-origin: top right;
        }

        .spinner-face:nth-of-type(3) {
          transform: rotateY(270deg) translateX(-50%);
          transform-origin: center left;
        }

        .spinner-face:nth-of-type(4) {
          transform: rotateX(90deg) translateY(-50%);
          transform-origin: top center;
        }

        .spinner-face:nth-of-type(5) {
          transform: rotateX(-90deg) translateY(50%);
          transform-origin: bottom center;
        }

        .spinner-face:nth-of-type(6) {
          transform: translateZ(22px);
        }

        @keyframes spinner-rotate {
          0% {
            transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
          }
          50% {
            transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
          }
          100% {
            transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Loading;
