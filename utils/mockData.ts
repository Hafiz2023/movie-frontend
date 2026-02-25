import { ShortVideo, Plan, Model, MockVideo } from '../types';

export const MOCK_SHORTS: ShortVideo[] = [
    {
        id: 1,
        title: "Funny Cat Bloopers 1",
        video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail_url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
        category: "Comedy",
        views: 12000,
        likes: 500
    },
    {
        id: 2,
        title: "Action Movie Stunts",
        video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail_url: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
        category: "Action",
        views: 45000,
        likes: 2100
    },
    {
        id: 3,
        title: "Amazing Nature 4K",
        video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail_url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
        category: "Nature",
        views: 89000,
        likes: 5600
    },
    {
        id: 4,
        title: "Tech Gadget Review",
        video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
        category: "Tech",
        views: 1500,
        likes: 120
    },
    {
        id: 5,
        title: "Top 10 Goals",
        video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail_url: "https://images.unsplash.com/photo-1579952363873-27f3bade8f55?q=80&w=2070&auto=format&fit=crop",
        category: "Sports",
        views: 98000,
        likes: 11000
    },
    {
        id: 6,
        title: "Cooking Pasta Like a Pro",
        video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
        thumbnail_url: "https://images.unsplash.com/photo-1546549010-63b5dd768460?q=80&w=2080&auto=format&fit=crop",
        category: "Food",
        views: 23000,
        likes: 890
    }
];

export const MOCK_PLANS: Plan[] = [
    {
        id: 1,
        name: "Basic Plan",
        price: 9.99,
        stripe_price_id: "price_1234567890",
        duration: "month"
    },
    {
        id: 2,
        name: "Pro Plan",
        price: 19.99,
        stripe_price_id: "price_0987654321",
        duration: "month"
    },
    {
        id: 3,
        name: "Annual Plan",
        price: 199.99,
        stripe_price_id: "price_1122334455",
        duration: "year"
    }
];

export const MOCK_MODELS: Model[] = [
    {
        id: 1,
        name: "Mia Khalifa",
        rank: 1,
        videos: 120,
        views: "1.5B",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Lana Rhoades",
        rank: 2,
        videos: 85,
        views: "980M",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Riley Reid",
        rank: 3,
        videos: 450,
        views: "2.1B",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Abella Danger",
        rank: 4,
        videos: 310,
        views: "1.2B",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Johnny Sins",
        rank: 5,
        videos: 999,
        views: "3.5B",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Brandi Love",
        rank: 6,
        videos: 200,
        views: "800M",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Angela White",
        rank: 7,
        videos: 150,
        views: "900M",
        avatar: "https://images.unsplash.com/photo-1616594039964-40891a9046c9?q=80&w=100&auto=format&fit=crop"
    },
    {
        id: 8,
        name: "Eva Elfie",
        rank: 8,
        videos: 95,
        views: "450M",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop"
    }
];

export const MOCK_VIDEOS: MockVideo[] = [
    {
        id: 1,
        title: "Hot Teen Neighbor Caught",
        thumbnail_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
        duration: "12:45",
        author: "Jessica Smith",
        author_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
        views: "1.2M",
        date: "2 days ago",
        category: "Teen",
        likes: "12K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        description: "The girl next door has a secret she wants to share with you.",
        tags: ["Teen", "Amateur", "POV"]
    },
    {
        id: 2,
        title: "Milf Teaching a Lesson",
        thumbnail_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
        duration: "45:20",
        author: "Amanda Lee",
        author_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
        views: "85K",
        date: "1 week ago",
        category: "Milf",
        likes: "4.5K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        description: "Experience tells the story. Watch as this mature beauty takes charge.",
        tags: ["Milf", "Mature", "Teacher"]
    },
    {
        id: 3,
        title: "Passionate Latin Romance",
        thumbnail_url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2031&auto=format&fit=crop",
        duration: "10:00",
        author: "Sophie Dee",
        author_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
        views: "340K",
        date: "3 weeks ago",
        category: "Latin",
        likes: "22K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        description: "Fiery passion and intense romance with a stunning Latin beauty.",
        tags: ["Latin", "Brunette", "Romantic"]
    },
    {
        id: 4,
        title: "Amateur Couple Home Tape",
        thumbnail_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
        duration: "18:30",
        author: "Rachel Green",
        author_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
        views: "2.5M",
        date: "1 month ago",
        category: "Amateur",
        likes: "150K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        description: "Real couple, real passion. No scripts, just pure amateur fun.",
        tags: ["Amateur", "Couple", "Real"]
    },
    {
        id: 5,
        title: "Intense Threesome Action",
        thumbnail_url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2070&auto=format&fit=crop",
        duration: "22:15",
        author: "Johnny Sins",
        author_avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop",
        views: "3.2M",
        date: "3 days ago",
        category: "Threesome",
        likes: "45K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        description: "Two stunning models join forces for an unforgettable threesome experience.",
        tags: ["Threesome", "3some", "Group"]
    },
    {
        id: 6,
        title: "Couple Sex in Single Bedroom",
        thumbnail_url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop",
        duration: "18:40",
        author: "Real Couples",
        author_avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop",
        views: "890K",
        date: "5 days ago",
        category: "Couple",
        likes: "15K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        description: "Intimate and passionate couple sex recorded in a private single bedroom.",
        tags: ["Couple", "Bedroom", "Real"]
    },
    {
        id: 7,
        title: "Wild Foursome Party",
        thumbnail_url: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop",
        duration: "35:00",
        author: "Party Hard",
        author_avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=100&auto=format&fit=crop",
        views: "1.5M",
        date: "1 week ago",
        category: "Foursome",
        likes: "28K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        description: "Four people, endless pleasure. Watch the action unfold in this wild foursome.",
        tags: ["Foursome", "Group", "Party"]
    },
    {
        id: 8,
        title: "Two Couples Swap",
        thumbnail_url: "https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?q=80&w=2098&auto=format&fit=crop",
        duration: "42:10",
        author: "Swingers Life",
        author_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
        views: "2.1M",
        date: "2 weeks ago",
        category: "Group",
        likes: "35K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        description: "Two adventurous couples decide to swap partners for a night of intense pleasure.",
        tags: ["Group", "Swingers", "Couple"]
    },
    {
        id: 9,
        title: "Japanese Oil Massage",
        thumbnail_url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop",
        duration: "25:45",
        author: "Asian Fantasy",
        author_avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop",
        views: "5.6M",
        date: "1 day ago",
        category: "Asian",
        likes: "45K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        description: "Relaxing and sensual Japanese oil massage technique.",
        tags: ["Asian", "Massage", "Oil"]
    },
    {
        id: 10,
        title: "Secret Office Romance",
        thumbnail_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
        duration: "14:20",
        author: "Office Confidential",
        author_avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
        views: "980K",
        date: "3 days ago",
        category: "Roleplay",
        likes: "18K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        description: "What happens in the office stays in the office. A secret romance unfolds.",
        tags: ["Office", "Secretary", "Boss"]
    },
    {
        id: 11,
        title: "Poolside Bikini Tease",
        thumbnail_url: "https://images.unsplash.com/photo-1533157832269-1ae89a3f2f54?q=80&w=2072&auto=format&fit=crop",
        duration: "08:15",
        author: "Summer Vibez",
        author_avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=100&auto=format&fit=crop",
        views: "750K",
        date: "2 days ago",
        category: "Teens",
        likes: "25K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        description: "Enjoying the summer sun by the pool in a stunning bikini.",
        tags: ["Pool", "Bikini", "Summer"]
    },
    {
        id: 12,
        title: "Yoga Teacher Stretching",
        thumbnail_url: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop",
        duration: "30:00",
        author: "Fit & Flexy",
        author_avatar: "https://images.unsplash.com/photo-1518951740800-2cb0d7911666?q=80&w=100&auto=format&fit=crop",
        views: "3.1M",
        date: "1 week ago",
        category: "Yoga",
        likes: "32K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        description: "Deep stretching exercises with a flexible yoga instructor.",
        tags: ["Yoga", "Flexible", "Stretching"]
    },
    {
        id: 13,
        title: "Late Night Car Fun",
        thumbnail_url: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop",
        duration: "11:50",
        author: "Night Riders",
        author_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
        views: "1.8M",
        date: "4 days ago",
        category: "Public",
        likes: "21K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        description: "A spontaneous adventure in the car late at night.",
        tags: ["Car", "Public", "Outdoor"]
    },
    {
        id: 14,
        title: "Live Cam Show - Friday Night Special",
        thumbnail_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2070&auto=format&fit=crop",
        duration: "1:02:30",
        author: "Mia Khalifa",
        author_avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
        views: "4.2M",
        date: "1 day ago",
        category: "Live Cams",
        likes: "89K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        description: "Join me for an exclusive Friday night live cam show. Tips keep the show going!",
        tags: ["Live Cams", "CamShow", "Live", "Interactive"]
    },
    {
        id: 15,
        title: "Live Private Cam Session",
        thumbnail_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2070&auto=format&fit=crop",
        duration: "45:15",
        author: "Lana Rhoades",
        author_avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
        views: "2.8M",
        date: "3 days ago",
        category: "Live Cams",
        likes: "52K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        description: "An intimate private cam session recorded live. Fan-requested special edition.",
        tags: ["Live Cams", "Private", "CamShow", "Exclusive"]
    },
    {
        id: 16,
        title: "Interactive Live Cam Party",
        thumbnail_url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
        duration: "1:30:00",
        author: "Eva Elfie",
        author_avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop",
        views: "1.5M",
        date: "5 days ago",
        category: "Live Cams",
        likes: "34K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        description: "Interactive live cam party with viewer-controlled actions. The audience decides!",
        tags: ["Live Cams", "Interactive", "Party", "CamShow"]
    },
    {
        id: 17,
        title: "Late Night Live Cam Stream",
        thumbnail_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        duration: "55:40",
        author: "Angela White",
        author_avatar: "https://images.unsplash.com/photo-1616594039964-40891a9046c9?q=80&w=100&auto=format&fit=crop",
        views: "3.1M",
        date: "2 days ago",
        category: "Live Cams",
        likes: "67K",
        video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        description: "A steamy late night live cam stream. Viewer tips unlocked special surprises throughout the night.",
        tags: ["Live Cams", "Late Night", "Stream", "CamShow"]
    }
];
