import { useState, useRef } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import Avatar from './Avatar';
import axios from 'axios';
import { useToast } from '@/context/ToastContext';

export default function ProfilePictureButton({ user, onUpdate }) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const { addToast } = useToast();

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validation
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            addToast('Only JPG, PNG, and WEBP files are allowed.', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            addToast('File size must be less than 5MB.', 'error');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/v1/profile/picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                addToast('Profile picture updated!', 'success');
                onUpdate(response.data.imageUrl);
            }
        } catch (err) {
            console.error(err);
            addToast(err.response?.data?.error || 'Upload failed. Please try again.', 'error');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="relative group cursor-pointer" onClick={() => !isUploading && fileInputRef.current?.click()}>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileSelect}
                disabled={isUploading}
            />

            <Avatar src={user.profilePicture} alt={user.name} size="xl" />

            {/* Overlay */}
            <div className={`absolute inset-0 rounded-full bg-black/50 flex items-center justify-center transition-opacity ${isUploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {isUploading ? (
                    <Loader2 className="text-neon-cyan animate-spin" size={24} />
                ) : (
                    <Camera className="text-white" size={24} />
                )}
            </div>

            {/* Edit Badge */}
            {!isUploading && (
                <div className="absolute bottom-0 right-0 bg-neon-purple text-white p-1.5 rounded-full shadow-lg border border-black">
                    <Camera size={14} />
                </div>
            )}
        </div>
    );
}
