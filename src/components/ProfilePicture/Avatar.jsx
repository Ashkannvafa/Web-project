import { User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Avatar({ src, alt, size = 'md', className }) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-24 h-24',
        xl: 'w-32 h-32',
    };

    return (
        <div
            className={twMerge(
                clsx(
                    'rounded-full bg-gradient-to-tr from-neon-purple to-neon-cyan p-1 shadow-[0_0_30px_rgba(168,85,247,0.4)] overflow-hidden',
                    sizeClasses[size],
                    className
                )
            )}
        >
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative">
                {src ? (
                    <img
                        src={src}
                        alt={alt || 'Avatar'}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <User className="text-white w-1/2 h-1/2" />
                )}
            </div>
        </div>
    );
}
