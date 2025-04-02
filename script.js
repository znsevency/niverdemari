
// Password page functionality
const correctPassword = '0710';
const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const envelope = document.querySelector('.envelope');
const letterContent = document.querySelector('.letter-content');
const accessButton = document.getElementById('accessButton');

passwordForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (passwordInput.value === correctPassword) {
    envelope.classList.add('envelope-open');
    letterContent.classList.remove('hidden');
    passwordForm.classList.add('hidden');
    accessButton.classList.remove('hidden');
  } else {
    showToast();
  }
});

// Toast notification
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s forwards';
    setTimeout(() => {
      toast.classList.add('hidden');
      toast.style.animation = '';
    }, 300);
  }, 3000);
}

// Navigation between pages
function showCelebrationPage() {
  document.getElementById('passwordPage').classList.add('hidden');
  document.getElementById('celebrationPage').classList.remove('hidden');
  generateConfetti();
  loadSongs();
  loadReasons();
  setupScrollListener();
}

// Confetti generation
function generateConfetti() {
  const confettiContainer = document.getElementById('confettiContainer');
  const colors = ['#FF71D0', '#9B87F5', '#71C9FF', '#FFC0CB'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    const left = `${Math.random() * 100}%`;
    const animationDelay = `${Math.random() * 3}s`;
    const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.left = left;
    confetti.style.backgroundColor = backgroundColor;
    confetti.style.animationDelay = animationDelay;
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 10 + 5}px`;
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
    
    confettiContainer.appendChild(confetti);
  }
}

// Load songs in the music player
function loadSongs() {
  const songs = [
    { title: "Get You", artist: "Daniel Caesar", emoji: "❤️", audioUrl: "" },
    { title: "Amor Mio", artist: "Frank Sark", emoji: "💕", audioUrl: "" },
    { title: "Extresse", artist: "Alee", emoji: "😊", audioUrl: "" },
    { title: "O velho e a flor", artist: "Toquinho", emoji: "✨", audioUrl: "" },
    { title: "Oceano", artist: "Djavan", emoji: "🌟", audioUrl: "" },
    { title: "Coraçao selvagem", artist: "Belchior", emoji: "🎵", audioUrl: "" },
    { title: "No other heart", artist: "Mac De Marco", emoji: "💘", audioUrl: "" },
  ];
  
  const musicList = document.getElementById('musicList');
  let currentAudio = null;
  let playingIndex = null;
  
  songs.forEach((song, index) => {
    const songElement = document.createElement('div');
    songElement.className = 'music-item';
    
    songElement.innerHTML = `
      <div class="music-info">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
      <div class="music-controls">
        <span class="music-emoji">${song.emoji}</span>
        <button class="play-button" data-index="${index}">Play</button>
      </div>
    `;
    
    musicList.appendChild(songElement);
  });
  
  // Add event listeners to play buttons
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      
      if (currentAudio) {
        currentAudio.pause();
        document.querySelectorAll('.play-button').forEach(btn => {
          btn.textContent = 'Play';
          btn.classList.remove('playing');
        });
      }
      
      if (playingIndex === index) {
        playingIndex = null;
        return;
      }
      
      // For demonstration - in a real app, you'd use the actual audio URLs
      const audio = new Audio(songs[index].audioUrl || 'https://example.com/song.mp3');
      audio.volume = 0.5;
      
      // Just for demo purposes since we don't have real audio files
      button.textContent = 'procura no spotify fia';
      button.classList.add('playing');
      
      // Stop after 10 seconds for demo
      setTimeout(() => {
        button.textContent = 'Play';
        button.classList.remove('playing');
        playingIndex = null;
      }, 10000);
      
      currentAudio = audio;
      playingIndex = index;
    });
  });
}

// Load the reasons list
function loadReasons() {
  const reasons = [
    "o fato de voce sempre me fazer sorrir",
    "sua risada",
    "sua beleza que me encanta todos os dias, pprt",
    "seu sorriso",
    "sua determinação",
    "sua dedicaçao",
    "a Maneira que voce me motiva", // Special reason #7
    "sua personalidade incrivel e unica",
    "Nossos momentos felizes",
    "Sua inteligência admirável",
    "Como você sempre sabe o que dizer",
    "A forma como você me entende",
    "Como você me apoia em tudo",
    "O jeito que você olha para mim",
    "o jeito que voce reage as minhas brincadeiras",
    "A paz que sinto quando estou com você",
    "Sua paciencia",
    "A sua parte conversadeira",
    "A maneirs que me faz acreditar no amor"
  ];
  
  const reasonsList = document.getElementById('reasonsList');
  
  reasons.forEach((reason, index) => {
    const reasonElement = document.createElement('div');
    reasonElement.className = 'reason-item';
    
    let heartIcon = '';
    if (index === 6) {
      heartIcon = `<span class="heart-icon" onclick="showDialog('specialMessageDialog')">❤️</span>`;
    }
    
    reasonElement.innerHTML = `
      <span class="reason-number">#${index + 1}</span>
      <p>${reason}</p>
      ${heartIcon}
    `;
    
    reasonsList.appendChild(reasonElement);
  });
}

// Setup photo click handlers
document.addEventListener('DOMContentLoaded', function() {
  const photos = document.querySelectorAll('.polaroid');
  
  photos.forEach(photo => {
    photo.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      if (index === '2') {
        showDialog('secretMessageDialog');
      }
    });
  });
  
  // Setup fake ad click
  document.getElementById('fakeAd').addEventListener('click', function() {
    showDialog('fakeAdDialog');
  });
});

// Dialog functions
function showDialog(dialogId) {
  document.getElementById(dialogId).classList.remove('hidden');
}

function closeDialog(dialogId) {
  document.getElementById(dialogId).classList.add('hidden');
}

// Setup scroll listener for bottom message
function setupScrollListener() {
  window.addEventListener('scroll', function() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 10;
    
    if (scrolledToBottom) {
      document.getElementById('bottomMessage').classList.remove('hidden');
    }
  });
}