// گرفتن المنت‌های مورد نیاز از صفحه برای کنترل موزیک پلیر
const audio = document.getElementById("audio"); // تگ صوتی برای پخش موزیک
const playPauseButton = document.getElementById("play-pause-btn"); // دکمه پخش/توقف
const prevButton = document.getElementById("prev-btn"); // دکمه آهنگ قبلی
const nextButton = document.getElementById("next-btn"); // دکمه آهنگ بعدی
const volumeSlider = document.querySelector(".volume-slider"); // اسلایدر تنظیم صدا
const seekSlider = document.querySelector(".seek-slider"); // اسلایدر جابجایی در آهنگ
const coverImage = document.querySelector(".cover-img"); // عکس کاور آهنگ
const currentTimeDisplay = document.querySelector(".current-time"); // نمایش زمان فعلی
const totalTimeDisplay = document.querySelector(".total-time"); // نمایش کل زمان آهنگ
const singerName = document.querySelector(".singer-name"); // نمایش نام خواننده
const musicName = document.querySelector(".music-name"); // نمایش نام آهنگ

// آرایه‌ای از اطلاعات آهنگ‌ها (نام خواننده، نام آهنگ، مسیر فایل صوتی و کاور)
const playList = [
  {
    singerName: "Abdoul Pit",
    musicName: "singer name 1",
    audioSrc: "./assets/1-music.mp3",
    coverSrc: "./assets/1-cover.jpg",
  },
  {
    singerName: "Json Jafari",
    musicName: "singer name 2",
    audioSrc: "./assets/2-music.mp3",
    coverSrc: "./assets/2-cover.jpg",
  },
  {
    singerName: "Anjelina Habibi",
    musicName: "singer name 3",
    audioSrc: "./assets/3-music.mp3",
    coverSrc: "./assets/3-cover.jpg",
  },
];

let currentIndex = 0; // شماره آهنگ فعلی در لیست
let isPlaying = false; // وضعیت پخش یا توقف موزیک

// تابع بارگذاری اطلاعات آهنگ فعلی و نمایش آن در صفحه
const loadAudio = () => {
  const track = playList[currentIndex];
  coverImage.src = track.coverSrc; // نمایش عکس کاور
  singerName.textContent = track.singerName; // نمایش نام خواننده
  musicName.textContent = track.musicName; // نمایش نام آهنگ
  audio.src = track.audioSrc; // بارگذاری فایل صوتی

  // اگر موزیک در حال پخش باشد، پخش را ادامه بده و انیمیشن کاور را فعال کن
  if (isPlaying) {
    audio.play();
    coverImage.classList.add("cover-animation");
  }
};

// رویداد کلیک روی دکمه پخش/توقف
playPauseButton.addEventListener("click", () => {
  // تغییر آیکون دکمه پخش/توقف
  const playPauseIcon = playPauseButton.firstElementChild;

  if (isPlaying) {
    audio.pause(); // توقف موزیک
    coverImage.classList.remove("cover-animation"); // حذف انیمیشن کاور
    playPauseIcon.classList.replace("fa-pause", "fa-play"); // تغییر آیکون به پخش
  } else {
    audio.play(); // پخش موزیک
    coverImage.classList.add("cover-animation"); // فعال کردن انیمیشن کاور
    playPauseIcon.classList.replace("fa-play", "fa-pause"); // تغییر آیکون به توقف
  }

  isPlaying = !isPlaying; // تغییر وضعیت پخش
});

// رویداد تغییر مقدار اسلایدر صدا
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value; // تنظیم مقدار صدا بر اساس اسلایدر
});

// رویداد تغییر مقدار اسلایدر جابجایی در آهنگ
seekSlider.addEventListener("input", () => {
  // محاسبه زمان جدید بر اساس درصد اسلایدر
  const newTime = audio.duration * (seekSlider.value / 100);
  audio.currentTime = newTime; // تنظیم زمان فعلی موزیک
});

// رویداد کلیک روی دکمه آهنگ بعدی
nextButton.addEventListener("click", () => {
  currentIndex += 1; // رفتن به آهنگ بعدی

  // اگر به انتهای لیست رسیدیم، به اول برگردیم
  if (currentIndex > playList.length - 1) {
    currentIndex = 0;
  }

  playPauseButton.firstElementChild.classList.replace("fa-play", "fa-pause"); // تغییر آیکون به توقف
  isPlaying = true; // وضعیت پخش را فعال کن

  loadAudio(); // بارگذاری آهنگ جدید
});

// رویداد کلیک روی دکمه آهنگ قبلی
prevButton.addEventListener("click", () => {
  currentIndex -= 1; // رفتن به آهنگ قبلی
  if (currentIndex < 0) {
    currentIndex = playList.length - 1; // اگر به اول لیست رسیدیم، به آخر برگردیم
  }

  playPauseButton.firstElementChild.classList.replace("fa-play", "fa-pause"); // تغییر آیکون به توقف
  isPlaying = true; // وضعیت پخش را فعال کن

  loadAudio(); // بارگذاری آهنگ جدید
});

// رویداد بروزرسانی زمان موزیک و اسلایدر هنگام پخش
audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime; // زمان فعلی موزیک
  const totalTime = audio.duration; // کل زمان موزیک

  const percentage = (currentTime / totalTime) * 100; // درصد پیشرفت موزیک

  if (percentage) {
    seekSlider.value = percentage; // بروزرسانی اسلایدر جابجایی
  }

  if ((currentTime, totalTime)) {
    currentTimeDisplay.textContent = formatTime(currentTime); // نمایش زمان فعلی
    totalTimeDisplay.textContent = formatTime(totalTime); // نمایش کل زمان
  }
});

// تابع تبدیل ثانیه به فرمت دقیقه:ثانیه برای نمایش زمان
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
// فرمت دقیقه:ثانیه 
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// رویداد پایان موزیک: ریست کردن وضعیت پخش و آیکون
audio.addEventListener("ended", () => {
  isPlaying = false;
  playPauseButton.firstElementChild.classList.replace("fa-pause", "fa-play");
});

// بارگذاری اولیه آهنگ هنگام شروع صفحه
loadAudio();