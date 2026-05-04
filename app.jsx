const { useState, useEffect } = React;

// --- Supabase Config ---
const SUPABASE_URL = 'https://mwuhbwlerbcvqlregxff.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dWhid2xlcmJjdnFscmVneGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4ODMwOTYsImV4cCI6MjA5MzQ1OTA5Nn0.YZjR8MAqPdD_xYw6mr9QLJ0ci-B6LHMPUxV6-Y4LuaI';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Icons (Lucide-style SVGs) ---
const HeartIcon = ({ filled, onClick, onMouseEnter, onMouseLeave, className = "" }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" 
        viewBox="0 0 24 24" 
        fill={filled ? "#ec4899" : "none"} 
        stroke={filled ? "#ec4899" : "currentColor"} 
        strokeWidth="2" 
        strokeLinecap="round" strokeLinejoin="round" 
        className={`cursor-pointer transition-colors duration-200 ${className}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
);

const PlusIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
);

const MapPinIcon = ({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
);

const TrashIcon = ({ className = "", onClick }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`cursor-pointer hover:text-red-500 transition-colors ${className}`}>
        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
);

const ArrowLeftIcon = ({ className = "", onClick }) => (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`cursor-pointer hover:text-gray-600 transition-colors ${className}`}>
        <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
);

// --- Components ---

const Rating = ({ value, onChange }) => {
    const [hoverValue, setHoverValue] = useState(0);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <HeartIcon 
                    key={star}
                    filled={star <= (hoverValue || value)}
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHoverValue(star)}
                    onMouseLeave={() => setHoverValue(0)}
                    className="text-[#800000] hover:scale-110"
                />
            ))}
        </div>
    );
};

const WashiTape = ({ color, top, left, right, rotation }) => {
    const bgColors = {
        pink: 'bg-pink-300',
        blue: 'bg-blue-300',
        yellow: 'bg-yellow-300',
        green: 'bg-green-300'
    };
    
    return (
        <div 
            className={`washi-tape ${bgColors[color] || 'bg-pink-300'} w-24`}
            style={{
                top: top || '-12px',
                left: left,
                right: right,
                transform: `rotate(${rotation || '-2deg'})`,
                zIndex: 10
            }}
        />
    );
};

const Sticker = ({ type, top, right, bottom, left }) => {
    const emojis = {
        star: '⭐',
        sparkle: '✨',
        coffee: '☕',
        leaf: '🌿'
    };
    
    return (
        <div 
            className="absolute text-2xl filter drop-shadow-md z-10 hover:scale-125 transition-transform cursor-pointer"
            style={{ top, right, bottom, left }}
            title="Sticker placeholder (Replace with PNG)"
        >
            {emojis[type] || '✨'}
        </div>
    );
};

const EditableText = ({ text, onSave, className, multiline = false, placeholder }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(text);

    const handleBlur = () => {
        setIsEditing(false);
        if (value !== text) onSave(value);
    };

    if (isEditing) {
        return multiline ? (
            <textarea
                autoFocus
                className={`w-full bg-transparent border-b border-pink-300 focus:outline-none resize-none ${className}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                placeholder={placeholder}
                rows={3}
            />
        ) : (
            <input
                autoFocus
                className={`w-full bg-transparent border-b border-pink-300 focus:outline-none ${className}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                placeholder={placeholder}
            />
        );
    }

    return (
        <div 
            className={`cursor-text hover:bg-white/30 rounded px-1 -mx-1 min-h-[1.5em] transition-colors ${className} ${!text ? 'text-gray-400 italic' : ''}`}
            onClick={() => setIsEditing(true)}
        >
            {text || placeholder}
        </div>
    );
};

const CafeCard = ({ cafe, updateCafe, deleteCafe, index }) => {
    // Generate some pseudo-random styling based on index for the scrapbook feel
    const rotations = ['-2deg', '3deg', '-1deg', '2deg', '-3deg'];
    const tapeColors = ['pink', 'blue', 'yellow', 'green'];
    const stickerTypes = ['star', 'sparkle', 'coffee', 'leaf'];
    
    const rotation = rotations[index % rotations.length];
    const tapeColor = tapeColors[index % tapeColors.length];
    const sticker = stickerTypes[(index + 1) % stickerTypes.length];
    
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = React.useRef(null);
    
    const uploadImage = async (file) => {
        if (!file) return;
        setIsUploading(true);
        try {
            const fileExt = file.name ? file.name.split('.').pop() : 'png';
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            
            const { error: uploadError } = await supabaseClient.storage
                .from('cafe-images')
                .upload(fileName, file);
                
            if (uploadError) {
                console.error('Upload error:', uploadError);
                alert('Failed to upload image. Please try again.');
                return;
            }
            
            const { data } = supabaseClient.storage
                .from('cafe-images')
                .getPublicUrl(fileName);
                
            if (data && data.publicUrl) {
                updateCafe({ ...cafe, imageUrl: data.publicUrl });
            }
        } catch (err) {
            console.error('Unexpected error during upload:', err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            uploadImage(e.target.files[0]);
        }
    };

    const handlePaste = (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                const blob = items[i].getAsFile();
                uploadImage(blob);
                e.preventDefault();
                break;
            }
        }
    };

    return (
        <div 
            className="relative transition-transform duration-500 hover:z-20 hover:scale-105"
            style={{ transform: `rotate(${rotation})` }}
        >
            <WashiTape color={tapeColor} left="50%" rotation="-3deg" style={{ marginLeft: '-48px' }} />
            
            <div className="polaroid relative group">
                <button 
                    onClick={() => deleteCafe(cafe.id)}
                    className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20 text-gray-400 hover:text-red-500"
                >
                    <TrashIcon className="w-4 h-4" />
                </button>

                <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                />

                <div 
                    className="aspect-square bg-gray-100 mb-4 rounded cursor-pointer overflow-hidden flex flex-col items-center justify-center border border-gray-200 group/img relative focus:outline-none focus:ring-2 focus:ring-pink-300"
                    onClick={() => fileInputRef.current?.click()}
                    onPaste={handlePaste}
                    tabIndex={0}
                    title="Click to upload or Paste an image"
                >
                    {isUploading ? (
                        <div className="flex flex-col items-center text-gray-500">
                            <div className="w-8 h-8 border-4 border-gray-200 border-t-pink-400 rounded-full animate-spin mb-2"></div>
                            <span className="font-ui text-sm font-medium">Uploading...</span>
                        </div>
                    ) : cafe.imageUrl ? (
                        <img src={cafe.imageUrl} alt={cafe.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-gray-400 flex flex-col items-center px-4 text-center">
                            <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-notes text-sm">Click to upload</span>
                            <span className="font-ui text-xs mt-1 text-gray-300">or Paste image</span>
                        </div>
                    )}
                    
                    {!isUploading && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white font-ui font-medium">Change Image</span>
                        </div>
                    )}
                </div>
                
                <div className="flex justify-between items-start mb-2">
                    <EditableText 
                        text={cafe.name} 
                        onSave={(val) => updateCafe({ ...cafe, name: val })}
                        className="font-notes text-2xl font-bold leading-tight max-w-[70%]"
                        placeholder="Cafe Name..."
                    />
                    <Rating 
                        value={cafe.rating} 
                        onChange={(val) => updateCafe({ ...cafe, rating: val })} 
                    />
                </div>
                
                <EditableText 
                    text={cafe.description} 
                    onSave={(val) => updateCafe({ ...cafe, description: val })}
                    className="font-notes text-gray-600 text-lg leading-relaxed"
                    multiline
                    placeholder="Write your thoughts..."
                />
            </div>
        </div>
    );
};

const LocationView = ({ location, onBack, onUpdateLocation }) => {
    const addCafe = async () => {
        const newCafe = {
            name: 'New Cafe',
            description: '',
            rating: 0,
            imageUrl: '',
            location_name: location.name
        };
        
        const { data, error } = await supabaseClient.from('cafes').insert([newCafe]).select();
        
        if (error) {
            console.error('Error inserting cafe:', error);
            alert('Failed to save to database. Check console.');
            return;
        }
        
        if (data && data.length > 0) {
            onUpdateLocation({
                ...location,
                cafes: [...location.cafes, data[0]]
            });
        }
    };

    const updateCafe = async (updatedCafe) => {
        const { id, ...updateData } = updatedCafe;
        const { error } = await supabaseClient.from('cafes').update(updateData).eq('id', id);
        
        if (error) console.error('Error updating cafe:', error);
        
        onUpdateLocation({
            ...location,
            cafes: location.cafes.map(c => c.id === updatedCafe.id ? updatedCafe : c)
        });
    };

    const deleteCafe = async (cafeId) => {
        if(confirm('Are you sure you want to delete this cafe?')) {
            const { error } = await supabaseClient.from('cafes').delete().eq('id', cafeId);
            
            if (error) console.error('Error deleting cafe:', error);
            
            onUpdateLocation({
                ...location,
                cafes: location.cafes.filter(c => c.id !== cafeId)
            });
        }
    };

    const updateLocationName = async (newName) => {
        if (!newName || newName === location.name) return;
        
        // Only update DB if there are cafes, otherwise just update local state
        if (location.cafes.length > 0) {
            const { error } = await supabaseClient
                .from('cafes')
                .update({ location_name: newName })
                .eq('location_name', location.name);
                
            if (error) {
                console.error('Error updating location name:', error);
                alert('Failed to update location name in database.');
                return;
            }
        }
        
        const updatedCafes = location.cafes.map(c => ({ ...c, location_name: newName }));
        onUpdateLocation({ ...location, name: newName, cafes: updatedCafes });
    };

    return (
        <div className="max-w-6xl mx-auto py-8">
            <div className="flex items-center gap-4 mb-12">
                <button 
                    onClick={onBack}
                    className="glass-panel p-3 rounded-full hover:bg-white/60 transition-colors"
                >
                    <ArrowLeftIcon />
                </button>
                <div className="glass-panel px-8 py-4 rounded-2xl relative inline-block">
                    <WashiTape color="pink" top="-10px" left="-20px" rotation="-5deg" />
                    <EditableText 
                        text={location.name}
                        onSave={updateLocationName}
                        className="font-notes text-5xl font-bold bg-gradient-to-r from-[#800000] to-purple-500 bg-clip-text text-transparent"
                        placeholder="Location Name"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
                {location.cafes.map((cafe, idx) => (
                    <CafeCard 
                        key={cafe.id} 
                        cafe={cafe} 
                        index={idx}
                        updateCafe={updateCafe}
                        deleteCafe={deleteCafe}
                    />
                ))}
                
                {/* Add New Cafe Card Placeholder */}
                <div className="flex items-center justify-center min-h-[350px]">
                    <button 
                        onClick={addCafe}
                        className="glass-panel border-dashed border-2 border-pink-300/50 rounded-xl w-full h-full min-h-[300px] flex flex-col items-center justify-center gap-4 text-[#800000] hover:text-[#4a0000] hover:bg-white/50 transition-all hover:scale-105"
                    >
                        <PlusIcon className="w-12 h-12" />
                        <span className="font-notes text-2xl">Add Cafe</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const HomeView = ({ locations, onSelectLocation, onAddLocation, onDeleteLocation }) => {
    return (
        <div className="max-w-4xl mx-auto py-12 flex flex-col items-center">
            <div className="relative mb-16">
                <WashiTape color="blue" top="-15px" left="20px" rotation="2deg" />
                <WashiTape color="yellow" top="40px" right="-20px" rotation="-4deg" />
                <div className="glass-panel px-12 py-8 rounded-3xl transform -rotate-1">
                    <h1 className="font-notes text-6xl md:text-8xl font-bold text-center text-gray-800 drop-shadow-sm">
                        Arleena's recs
                    </h1>
                    <p className="font-ui text-center text-gray-600 mt-4 text-lg">
                        Just my uh-pinions!
                    </p>
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {locations.map((loc, idx) => {
                    const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1'];
                    const rot = rotations[idx % rotations.length];
                    return (
                        <div key={loc.id} className="relative group">
                            <WashiTape color="pink" top="-8px" left="50%" style={{ marginLeft: '-48px' }} rotation="-2deg" />
                            <div 
                                className={`glass-panel p-6 rounded-xl cursor-pointer hover:bg-white/60 transition-all duration-300 hover:scale-105 transform ${rot} h-full flex flex-col`}
                                onClick={() => onSelectLocation(loc.id)}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <MapPinIcon className="w-6 h-6 text-[#800000]" />
                                        <h2 className="font-notes text-3xl font-bold">{loc.name}</h2>
                                    </div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onDeleteLocation(loc.id); }}
                                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="font-ui text-gray-600 mt-auto">
                                    {loc.cafes.length} {loc.cafes.length === 1 ? 'Cafe' : 'Cafes'} saved
                                </p>
                            </div>
                        </div>
                    );
                })}

                <button 
                    onClick={onAddLocation}
                    className="glass-panel p-6 rounded-xl border-dashed border-2 border-pink-300/50 flex flex-col items-center justify-center gap-2 text-[#800000] hover:text-[#4a0000] hover:bg-white/50 transition-all hover:scale-105 min-h-[150px]"
                >
                    <PlusIcon className="w-8 h-8" />
                    <span className="font-notes text-2xl">New Location</span>
                </button>
            </div>
        </div>
    );
};

const App = () => {
    const [locations, setLocations] = useState([]);
    const [currentLocationId, setCurrentLocationId] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const { data, error } = await supabaseClient.from('cafes').select('*');
            if (error) {
                console.error('Error loading cafes:', error);
                return;
            }
            if (data) {
                const grouped = {};
                data.forEach(c => {
                    const loc = c.location_name || 'Uncategorized';
                    if (!grouped[loc]) grouped[loc] = [];
                    grouped[loc].push(c);
                });
                
                let loadedLocs = Object.keys(grouped).map((k, i) => ({
                    id: i + 1,
                    name: k,
                    cafes: grouped[k]
                }));
                
                // If DB is empty, provide a default layout
                if (loadedLocs.length === 0) {
                    loadedLocs = [
                        { id: 1, name: 'Tokyo', cafes: [] },
                        { id: 2, name: 'Seoul', cafes: [] }
                    ];
                }
                
                setLocations(loadedLocs);
            }
        };
        loadData();
    }, []);

    const handleAddLocation = () => {
        const name = prompt('Enter new location name:');
        if (name && name.trim()) {
            setLocations([...locations, { id: Date.now(), name: name.trim(), cafes: [] }]);
        }
    };

    const handleDeleteLocation = async (id) => {
        if(confirm('Are you sure you want to delete this entire location and all its cafes?')) {
            const loc = locations.find(l => l.id === id);
            if (loc && loc.cafes.length > 0) {
                const { error } = await supabaseClient.from('cafes').delete().eq('location_name', loc.name);
                if (error) console.error('Error deleting location cafes:', error);
            }
            setLocations(locations.filter(l => l.id !== id));
            if (currentLocationId === id) setCurrentLocationId(null);
        }
    };

    const handleUpdateLocation = (updatedLocation) => {
        setLocations(locations.map(l => l.id === updatedLocation.id ? updatedLocation : l));
    };

    const activeLocation = locations.find(l => l.id === currentLocationId);

    return (
        <div className="w-full h-full">
            {activeLocation ? (
                <LocationView 
                    location={activeLocation} 
                    onBack={() => setCurrentLocationId(null)}
                    onUpdateLocation={handleUpdateLocation}
                />
            ) : (
                <HomeView 
                    locations={locations} 
                    onSelectLocation={setCurrentLocationId}
                    onAddLocation={handleAddLocation}
                    onDeleteLocation={handleDeleteLocation}
                />
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
