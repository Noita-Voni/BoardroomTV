// Enhanced video data with categories
const sampleVideos = [
    {
        id: 1,
        title: "CEO Leadership in Crisis",
        description: "Deep insights into navigating business challenges during uncertain times",
        videoSrc: "assets/video/video2.mp4",
        thumbnail: "assets/images/hero2.png",
        category: "ceo"
    },
    {
        id: 2,
        title: "Innovation in South African Business",
        description: "Exploring breakthrough strategies from industry pioneers",
        videoSrc: "assets/video/video3.mp4",
        thumbnail: "assets/images/hero3.png",
        category: "innovation"
    },
    {
        id: 3,
        title: "Building Billion-Dollar Companies",
        description: "Success stories from entrepreneurs who scaled globally",
        videoSrc: "assets/video/video4.mp4",
        thumbnail: "assets/images/hero4.png",
        category: "entrepreneurship"
    },
    {
        id: 4,
        title: "Digital Transformation Strategies",
        description: "How industry leaders are adapting to the digital age",
        thumbnail: "assets/images/hero5.png",
        url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
        category: "leadership"
    },
    {
        id: 5,
        title: "Entrepreneurship in Emerging Markets",
        description: "Opportunities and challenges in developing economies",
        thumbnail: "assets/images/hero6.png",
        url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
        category: "entrepreneurship"
    },
    {
        id: 6,
        title: "Future of Business Media",
        description: "Vision for the next generation of business content",
        thumbnail: "assets/images/hero-slide-1.jpg",
        url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
        category: "innovation"
    },
    {
        id: 7,
        title: "Leadership in Times of Change",
        description: "Adaptive leadership strategies for uncertain times",
        thumbnail: "assets/images/hero2.png",
        url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
        category: "leadership"
    },
    {
        id: 8,
        title: "CEO Insights: Scaling Globally",
        description: "International expansion strategies from successful CEOs",
        thumbnail: "assets/images/hero3.png",
        url: "https://youtube.com/watch?v=dQw4w9WgXcQ",
        category: "ceo"
    }
];

let videosLoaded = 0;
let currentFilter = 'all';
const videosPerLoad = 6;

function createVideoCard(video) {
    const cardElement = document.createElement('div');
    cardElement.className = 'video-card';
    cardElement.setAttribute('data-category', video.category);

    if (video.videoSrc) {
        // Local video with embedded player
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'video-card-player';

        const videoEl = document.createElement('video');
        videoEl.controls = true;
        videoEl.poster = video.thumbnail;
        videoEl.preload = 'metadata';
        videoEl.className = 'video-thumbnail';

        const source = document.createElement('source');
        source.src = video.videoSrc;
        source.type = 'video/mp4';

        videoEl.appendChild(source);
        videoWrapper.appendChild(videoEl);
        cardElement.appendChild(videoWrapper);
    } else {
        // External link with thumbnail
        cardElement.onclick = () => openVideo(video.url);
        cardElement.style.cursor = 'pointer';

        const thumbnail = document.createElement('img');
        thumbnail.src = video.thumbnail;
        thumbnail.alt = video.title;
        thumbnail.className = 'video-thumbnail';

        const playOverlay = document.createElement('div');
        playOverlay.className = 'play-overlay';
        playOverlay.innerHTML = '<i class="fas fa-play-circle"></i>';

        const thumbWrapper = document.createElement('div');
        thumbWrapper.className = 'video-card-player';
        thumbWrapper.style.position = 'relative';
        thumbWrapper.appendChild(thumbnail);
        thumbWrapper.appendChild(playOverlay);
        cardElement.appendChild(thumbWrapper);
    }
    
    const videoInfo = document.createElement('div');
    videoInfo.className = 'video-info';
    
    const title = document.createElement('h3');
    title.className = 'video-title';
    title.textContent = video.title;
    
    const description = document.createElement('p');
    description.className = 'video-description';
    description.textContent = video.description;
    
    const category = document.createElement('span');
    category.className = 'video-category';
    category.textContent = video.category.charAt(0).toUpperCase() + video.category.slice(1);
    category.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--gold);
        color: var(--text-dark);
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
    `;
    
    videoInfo.appendChild(title);
    videoInfo.appendChild(description);
    cardElement.appendChild(videoInfo);
    cardElement.appendChild(category);
    
    return cardElement;
}

function filterVideos(category) {
    currentFilter = category;
    const videoGrid = document.getElementById('videoGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
    
    // Clear current videos
    videoGrid.innerHTML = '';
    videosLoaded = 0;
    
    // Load filtered videos
    loadVideos();
}

function getFilteredVideos() {
    if (currentFilter === 'all') {
        return sampleVideos;
    }
    return sampleVideos.filter(video => video.category === currentFilter);
}

function loadVideos() {
    const videoGrid = document.getElementById('videoGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!videoGrid) return;
    
    const filteredVideos = getFilteredVideos();
    const videosToLoad = filteredVideos.slice(videosLoaded, videosLoaded + videosPerLoad);
    
    videosToLoad.forEach((video, index) => {
        const videoCard = createVideoCard(video);
        videoCard.style.opacity = '0';
        videoCard.style.transform = 'translateY(20px)';
        videoGrid.appendChild(videoCard);
        
        // Animate in with delay
        setTimeout(() => {
            videoCard.style.transition = 'all 0.5s ease';
            videoCard.style.opacity = '1';
            videoCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    videosLoaded += videosToLoad.length;
    
    // Hide load more button if all videos are loaded
    if (videosLoaded >= filteredVideos.length && loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    } else if (loadMoreBtn) {
        loadMoreBtn.style.display = 'inline-block';
    }
}

function openVideo(url) {
    window.open(url, '_blank');
}

// Load initial videos
document.addEventListener('DOMContentLoaded', () => {
    loadVideos();
    
    // Load more videos button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadVideos);
    }
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterVideos(filter);
        });
    });
});

// Function to integrate with YouTube API (placeholder)
async function fetchYouTubeVideos(channelId, apiKey) {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return [];
    }
}

// Function to integrate with LinkedIn API (placeholder)
async function fetchLinkedInPosts(accessToken) {
    try {
        // LinkedIn API integration would go here
        console.log('LinkedIn API integration placeholder');
        return [];
    } catch (error) {
        console.error('Error fetching LinkedIn posts:', error);
        return [];
    }
}