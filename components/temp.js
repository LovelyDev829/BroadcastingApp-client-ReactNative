const INITIAL_STATE = {
  currentMode: 1,
  currentAuthor: 1,
  currentSong: 1,
  currentTime: 0,
  volume: 0.6,
  modeCount: 4,
  modeList: [
    {
      modeId: 1,
      modeName: "بلد_01",
      authorCount: 3,
      authorList: [
        {
          authorId: 1,
          authorName: "مؤلف_01_01",
          authorImage: "http://10.0.2.2/resource/image/face/001.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_01_01_01",
              songUrl: "http://10.0.2.2/resource/sound/001.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_01_01_02",
              songUrl: "http://10.0.2.2/resource/sound/002.mp3",
            },
          ],
        },
        {
          authorId: 2,
          authorName: "مؤلف_01_02",
          authorImage: "http://10.0.2.2/resource/image/face/002.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_01_02_01",
              songUrl: "http://10.0.2.2/resource/sound/003.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_01_02_02",
              songUrl: "http://10.0.2.2/resource/sound/004.mp3",
            },
          ],
        },
        {
          authorId: 3,
          authorName: "مؤلف_01_03",
          authorImage: "http://10.0.2.2/resource/image/face/002.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_01_03_01",
              songUrl: "http://10.0.2.2/resource/sound/002.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_01_03_02",
              songUrl: "http://10.0.2.2/resource/sound/003.mp3",
            },
          ],
        },
      ],
    },
    {
      modeId: 2,
      modeName: "بلد_02",
      authorCount: 3,
      authorList: [
        {
          authorId: 1,
          authorName: "مؤلف_02_01",
          authorImage: "http://10.0.2.2/resource/image/face/004.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_02_01_01",
              songUrl: "http://10.0.2.2/resource/sound/004.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_02_01_02",
              songUrl: "http://10.0.2.2/resource/sound/001.mp3",
            },
          ],
        },
        {
          authorId: 2,
          authorName: "مؤلف_02_02",
          authorImage: "http://10.0.2.2/resource/image/face/001.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_02_02_01",
              songUrl: "http://10.0.2.2/resource/sound/003.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_02_02_02",
              songUrl: "http://10.0.2.2/resource/sound/004.mp3",
            },
          ],
        },
        {
          authorId: 3,
          authorName: "مؤلف_02_03",
          authorImage: "http://10.0.2.2/resource/image/face/002.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_02_03_01",
              songUrl: "http://10.0.2.2/resource/sound/001.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_02_03_02",
              songUrl: "http://10.0.2.2/resource/sound/002.mp3",
            },
          ],
        },
      ],
    },
    {
      modeId: 3,
      modeName: "بلد_03",
      authorCount: 3,
      authorList: [
        {
          authorId: 1,
          authorName: "مؤلف_03_01",
          authorImage: "http://10.0.2.2/resource/image/face/003.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_03_01_01",
              songUrl: "http://10.0.2.2/resource/sound/004.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_03_01_02",
              songUrl: "http://10.0.2.2/resource/sound/001.mp3",
            },
          ],
        },
        {
          authorId: 2,
          authorName: "مؤلف_03_02",
          authorImage: "http://10.0.2.2/resource/image/face/004.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_03_02_01",
              songUrl: "http://10.0.2.2/resource/sound/002.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_03_02_02",
              songUrl: "http://10.0.2.2/resource/sound/003.mp3",
            },
          ],
        },
        {
          authorId: 3,
          authorName: "مؤلف_03_03",
          authorImage: "http://10.0.2.2/resource/image/face/003.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_03_03_01",
              songUrl: "http://10.0.2.2/resource/sound/001.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_03_03_02",
              songUrl: "http://10.0.2.2/resource/sound/002.mp3",
            },
          ],
        },
      ],
    },
    {
      modeId: 4,
      modeName: "بلد_04",
      authorCount: 3,
      authorList: [
        {
          authorId: 1,
          authorName: "مؤلف_04_01",
          authorImage: "http://10.0.2.2/resource/image/face/001.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_04_01_01",
              songUrl: "http://10.0.2.2/resource/sound/003.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_04_01_02",
              songUrl: "http://10.0.2.2/resource/sound/004.mp3",
            },
          ],
        },
        {
          authorId: 2,
          authorName: "مؤلف_04_02",
          authorImage: "http://10.0.2.2/resource/image/face/004.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_04_02_01",
              songUrl: "http://10.0.2.2/resource/sound/002.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_04_02_02",
              songUrl: "http://10.0.2.2/resource/sound/003.mp3",
            },
          ],
        },
        {
          authorId: 3,
          authorName: "مؤلف_04_03",
          authorImage: "http://10.0.2.2/resource/image/face/002.jpg",
          authorLike: 0,
          songCount: 2,
          songList: [
            {
              songId: 1,
              songTitle: "أغنية_04_03_01",
              songUrl: "http://10.0.2.2/resource/sound/004.mp3",
            },
            {
              songId: 2,
              songTitle: "أغنية_04_03_02",
              songUrl: "http://10.0.2.2/resource/sound/002.mp3",
            },
          ],
        },
      ],
    },
  ],
};
