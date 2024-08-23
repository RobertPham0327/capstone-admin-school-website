import { PostObjType, WallDataType } from '@crema/types/models/apps/Wall';
import { generateUniqueID } from '@crema/helpers/StringHelper';
import { getFormattedDateTime } from '@crema/helpers/DateHelper';
import { MessageType } from '@crema/constants/AppEnums';

export const wallData: WallDataType = {
  id: 123,
  name: 'Suzanna J. Fowler',
  profilePic: '/assets/images/avatar/A1.jpg',
  videoCall: {
    users: [
      {
        id: 1,
        name: 'John Doe',
        profilePic: '/assets/images/avatar/A2.jpg',
      },
      {
        id: 2,
        name: 'Lily John',
        profilePic: '/assets/images/avatar/A3.jpg',
      },
      {
        id: 3,
        name: 'John Doe',
        profilePic: '/assets/images/avatar/A4.jpg',
      },
      {
        id: 4,
        name: 'Lily John',
        profilePic: '/assets/images/avatar/A5.jpg',
      },
      {
        id: 5,
        name: 'John Doe',
        profilePic: '/assets/images/avatar/A6.jpg',
      },
      {
        id: 6,
        name: 'Lily John',
        profilePic: '/assets/images/avatar/A1.jpg',
      },
    ],
    title: '8 mutual friends',
  },
  friendRequests: [
    {
      id: 5454,
      profilePic: '/assets/images/avatar/A4.jpg',
      name: 'Sarah Taylor',
      date: getFormattedDateTime(-12, 'minutes', 'ddd MMM DD YYYY kk:mm:ss Z'),
    },
    {
      id: 435,
      profilePic: '/assets/images/avatar/A5.jpg',
      name: 'Johna Say',
      date: getFormattedDateTime(-30, 'minutes', 'ddd MMM DD YYYY kk:mm:ss Z'),
    },
    {
      id: 54345,
      profilePic: '/assets/images/avatar/A25.jpg',
      name: 'Nikunj Lee',
      date: getFormattedDateTime(-50, 'minutes', 'ddd MMM DD YYYY kk:mm:ss Z'),
    },
    {
      id: 7656,
      profilePic: '/assets/images/avatar/A24.jpg',
      name: 'Kennie Sebestian',
      date: getFormattedDateTime(-120, 'minutes', 'ddd MMM DD YYYY kk:mm:ss Z'),
    },
    {
      id: 875456,
      profilePic: '/assets/images/avatar/A23.jpg',
      name: 'Bose Warne',
      date: getFormattedDateTime(-1, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
    },
  ],
  photos: [
    {
      id: 1,
      thumb: '/assets/images/wall/pic1.png',
    },
    {
      id: 2,
      thumb: '/assets/images/wall/pic2.png',
    },
    {
      id: 3,
      thumb: '/assets/images/wall/pic3.png',
    },
    {
      id: 4,
      thumb: '/assets/images/wall/pic4.png',
    },
    {
      id: 5,
      thumb: '/assets/images/wall/pic5.png',
    },
    {
      id: 6,
      thumb: '/assets/images/wall/pic2.png',
    },
    {
      id: 7,
      thumb: '/assets/images/wall/pic5.png',
    },
    {
      id: 8,
      thumb: '/assets/images/wall/pic1.png',
    },
    {
      id: 9,
      thumb: '/assets/images/wall/pic3.png',
    },
  ],
  about: [
    {
      id: 1,
      icon: 'person',
      text: '191 Main St, Bar Harbor, ME 04609, United States',
      linkType: '',
    },
    {
      id: 2,
      icon: 'phone',
      text: '092654 60634',
      linkType: 'phone',
    },
    {
      id: 3,
      icon: 'email',
      text: 'ericbrickey@gmail.com',
      linkType: 'email',
    },
    {
      id: 4,
      icon: 'error',
      text: 'Edit description',
      linkType: '',
    },
    {
      id: 5,
      icon: 'thumb',
      text: '331 people like this',
      linkType: '',
    },
    {
      id: 6,
      icon: 'public',
      text: 'https://www.crema.com',
      linkType: 'link',
    },
  ],
  suggestTeam: {
    icon: '/assets/images/wall/facebook.png',
    title: 'Facebook Design',
    subTitle: 'Product Design',
    mediaImg: '/assets/images/wall/fman.jpg',
  },
  stories: [
    {
      id: 1,
      avatar: '/assets/images/avatar/A1.jpg',
      title: 'Brooklyn Simmons',
      imgSrc: '/assets/images/wall/stories2.jpg',
    },
    {
      id: 2,
      avatar: '/assets/images/avatar/A5.jpg',
      title: 'Esther Howard',
      imgSrc: '/assets/images/wall/stories1.jpg',
    },
  ],
  whatsHappen: [
    {
      id: 1,
      imgSrc:
        'https://media.istockphoto.com/id/1565269886/vi/anh/tr%E1%BA%BB-em-l%C3%A0m-t%C3%A1c-ph%E1%BA%A9m-%C4%91i%C3%AAu-kh%E1%BA%AFc-c%C3%A1-m%E1%BA%ADp-b%E1%BA%B1ng-%C4%91%E1%BA%A5t-s%C3%A9t-x%C3%A1m-tr%C3%AAn-th%E1%BA%A3m-c%E1%BA%AFt-kraft-v%E1%BB%9Bi-m%E1%BB%99t-s%E1%BB%91-d%E1%BB%A5ng-c%E1%BB%A5.jpg?s=612x612&w=0&k=20&c=JdAYQtslD2fM0sqycnUZYh0gddlAqPb9WXrB_hmQios=',
      title: 'New Playground Opening',
      subTitle: 'Exciting New Facility at Happy Kids Kindergarten',
      tag: [
        {
          id: 1,
          name: 'Playground',
        },
        {
          id: 2,
          name: 'Outdoor Activities',
        },
      ],
    },
    {
      id: 2,
      imgSrc:
        'https://media.istockphoto.com/id/1360983085/vi/anh/tr%E1%BA%BB-m%E1%BB%9Bi-bi%E1%BA%BFt-%C4%91i-ph%C3%A1t-tri%E1%BB%83n-s%E1%BB%9Bm-ng%C4%83n-x%E1%BA%BFp-b%E1%BA%B1ng-g%E1%BB%97-v%C3%A0-%C4%91%E1%BA%BFm-m%C3%A0u-s%E1%BA%AFc-c%E1%BA%A7u-v%E1%BB%93ng-tr%C3%B2-ch%C6%A1i-h%E1%BB%8Dc-t%E1%BA%ADp-tr%E1%BA%BB.jpg?s=612x612&w=0&k=20&c=UFB_gpKfe533x7bKq7EXBAHzqvIunlSmQ65kg-DMu6s=',
      title: 'Arts and Crafts Day',
      subTitle: 'Creativity Unleashed at Little Stars Kindergarten',
      tag: [
        {
          id: 1,
          name: 'Arts',
        },
        {
          id: 2,
          name: 'Crafts',
        },
      ],
    },
    {
      id: 3,
      imgSrc:
        'https://media.istockphoto.com/id/473032112/vi/anh/tr%E1%BA%BB-m%E1%BA%ABu-gi%C3%A1o-vui-t%C6%B0%C6%A1i-vui-v%E1%BA%BB-l%C3%A0m-khu%C3%B4n-m%E1%BA%B7t.jpg?s=612x612&w=0&k=20&c=O21NGxj5UqqFWQDK6T1JPtLsZVMlLYkKVLDWGPHGOlQ=',
      title: 'Healthy Eating Week',
      subTitle: 'Promoting Nutrition at Sunshine Kindergarten',
      tag: [
        {
          id: 1,
          name: 'Health',
        },
        {
          id: 2,
          name: 'Nutrition',
        },
      ],
    },
    {
      id: 4,
      imgSrc:
        'https://media.istockphoto.com/id/1346505485/vi/anh/ch%E1%BB%91t-%C3%A1o-kho%C3%A1c-tr%C6%B0%E1%BB%9Dng-ti%E1%BB%83u-h%E1%BB%8Dc.jpg?s=612x612&w=0&k=20&c=SLNpfRGW7ZjR4QQdfmf0aowQeVd3rx4COQ6AO4nC9QU=',
      title: 'Storytelling Session',
      subTitle: 'Bringing Stories to Life at Tiny Tots Kindergarten',
      tag: [
        {
          id: 1,
          name: 'Storytelling',
        },
        {
          id: 2,
          name: 'Books',
        },
      ],
    },
    {
      id: 5,
      imgSrc:
        'https://media.istockphoto.com/id/474690025/vi/anh/tr%E1%BA%BB-em-t%E1%BA%A1i-s%E1%BB%9F-th%C3%BA-cho-h%C6%B0%C6%A1u-cao-c%E1%BB%95-%C4%83n.jpg?s=612x612&w=0&k=20&c=3o1efMtapvbOJ1VAWJ1ha3Ury3rUcwe_tll6Wwd4yZM=',
      title: 'Field Trip to the Zoo',
      subTitle: 'Adventurous Day Out for Little Explorers',
      tag: [
        {
          id: 1,
          name: 'Field Trip',
        },
        {
          id: 2,
          name: 'Zoo',
        },
      ],
    },
  ],
  recentNews: [
    {
      id: 1,
      user: {
        name: 'Ms. Olivia Thompson',
        profilePic:
          'https://media.istockphoto.com/id/1008485272/vi/anh/tr%E1%BB%9F-l%E1%BA%A1i-tr%C6%B0%E1%BB%9Dng-h%E1%BB%8Dc-b%E1%BA%B1ng-ch%E1%BB%AF-in-hoa-b%E1%BA%B1ng-ph%E1%BA%A5n-tr%E1%BA%AFng-b%E1%BA%B1ng-tay-%C4%91%C6%B0%E1%BB%A3c-vi%E1%BA%BFt-tr%C3%AAn-n%E1%BB%81n-b%E1%BA%A3ng-%C4%91en-b%E1%BA%B1ng-g%E1%BB%97.jpg?s=612x612&w=0&k=20&c=N8jgvqgaObOFi6AGe4D2y9J56OQDDrgdqmGEa-Y5kM8=',
      },
      title: 'Back to School Celebration',
      desc: 'Our little learners enjoyed a fun-filled day with games, music, and crafts to kick off the new school year!',
    },
    {
      id: 2,
      user: {
        name: 'Mr. Liam Johnson',
        profilePic:
          'https://media.istockphoto.com/id/1305177948/vi/anh/gia-%C4%91%C3%ACnh-c%C3%B3-tr%E1%BA%BB-nh%E1%BB%8F-%C4%91i-b%E1%BB%99-%C4%91%C6%B0%E1%BB%9Dng-d%C3%A0i-ngo%C3%A0i-tr%E1%BB%9Di-trong-thi%C3%AAn-nhi%C3%AAn-m%C3%B9a-h%C3%A8-%C4%91i-b%E1%BB%99-%E1%BB%9F-high-tatras.jpg?s=612x612&w=0&k=20&c=NTLk-uAKt8siV3drV3_FQEKgIJAufLb--dPWrxpr9T8=',
      },
      title: 'Nature Walk Adventure',
      desc: 'The children had an exciting outdoor adventure, exploring nature and learning about different plants and animals.',
    },
    {
      id: 3,
      user: {
        name: 'Ms. Sophia Williams',
        profilePic:
          'https://media.istockphoto.com/id/1159091878/vi/anh/ch%C3%A1u-trai-m%E1%BB%89m-c%C6%B0%E1%BB%9Di-%C4%91i-b%E1%BB%99-qua-c%C3%B4ng-vi%C3%AAn-m%C3%B9a-thu-v%E1%BB%9Bi-%C3%B4ng-b%C3%A0.jpg?s=612x612&w=0&k=20&c=J_9xEJ6Aa1HlM4t4_jFYTdQACGUn4g4r1uxyXg8qH3E=',
      },
      title: 'Grandparents Day',
      desc: 'A heartwarming event where grandparents joined us for a special day filled with stories, songs, and snacks.',
    },
    {
      id: 4,
      user: {
        name: 'Mr. Noah Brown',
        profilePic:
          'https://media.istockphoto.com/id/1352779429/vi/anh/khung-c%E1%BA%A3nh-trong-nh%C3%A0-tr%C3%AAn-c%C3%A1c-ti%E1%BB%87n-%C3%ADch-m%E1%BB%9Bi-c%E1%BB%A7a-th%C6%B0-vi%E1%BB%87n-qu%E1%BB%91c-gia-v%E1%BB%9Bi-nhi%E1%BB%81u-gh%E1%BA%BF-sofa-v%C3%A0-g%C3%B3c-%C4%91%E1%BB%8Dc.jpg?s=612x612&w=0&k=20&c=lWkk61IfKVrGAOUshXLzAYDncdT1n71_gVro7ILXsYc=',
      },
      title: 'New Reading Corner',
      desc: 'We’ve set up a cozy reading corner in our classroom, encouraging kids to dive into their favorite books during quiet time.',
    },
    {
      id: 5,
      user: {
        name: 'Ms. Emma Davis',
        profilePic:
          'https://media.istockphoto.com/id/1273306782/vi/anh/c%E1%BA%ADu-b%C3%A9-d%E1%BB%85-th%C6%B0%C6%A1ng-h%E1%BA%A1nh-ph%C3%BAc-v%E1%BB%9Bi-khu%C3%B4n-m%E1%BA%B7t-s%C6%A1n-ng%E1%BB%93i-tr%C6%B0%E1%BB%9Bc-m%C3%A1y-%E1%BA%A3nh-ch%E1%BB%91ng-l%E1%BA%A1i-b%E1%BA%A1n-b%C3%A8-c%E1%BB%A7a-m%C3%ACnh.jpg?s=612x612&w=0&k=20&c=seCpQCx9WTYtmKKo-MZ_XGwAnlchMMyaprcg_O4k8nE=',
      },
      title: 'Halloween Costume Parade',
      desc: 'The children showcased their creativity with an exciting Halloween costume parade, followed by treats and games!',
    },
  ],
  whoToFollow: [
    {
      id: 1,
      title: 'Annette Black',
      subTitle: '@Annette_Black',
      profilePic: '/assets/images/avatar/A18.jpg',
    },
    {
      id: 2,
      title: 'Ralph Edwards',
      subTitle: '@Ralph_Edwards',
      profilePic: '/assets/images/avatar/A19.jpg',
    },
    {
      id: 3,
      title: 'Bessie Cooper',
      subTitle: '@Bessie_Cooper',
      profilePic: '/assets/images/avatar/A20.jpg',
    },
    {
      id: 4,
      title: 'Wade Warren',
      subTitle: '@Wade_Warren',
      profilePic: '/assets/images/avatar/A14.jpg',
    },
    {
      id: 5,
      title: 'Robert Fox',
      subTitle: '@Robert_Fox',
      profilePic: '/assets/images/avatar/A15.jpg',
    },
    {
      id: 6,
      title: 'Huawei Europe',
      subTitle: '@Huawei_Europe',
      profilePic: '/assets/images/avatar/A7.jpg',
    },
  ],
  suggestions: [
    {
      id: 1,
      name: 'Facebook Design',
      desc: 'It is a long established fact that a user will be diverted',
      thumb: '/assets/images/wall/suggestion.png',
    },
    {
      id: 2,
      name: 'React Developers',
      desc: 'It is a long established fact that a user will be diverted',
      thumb: '/assets/images/wall/suggestion.png',
    },
    {
      id: 3,
      name: 'Buy & Sell',
      desc: 'It is a long established fact that a user will be diverted',
      thumb: '/assets/images/wall/suggestion.png',
    },
    {
      id: 4,
      name: 'All about travel',
      desc: 'It is a long established fact that a user will be diverted',
      thumb: '/assets/images/wall/suggestion.png',
    },
    {
      id: 5,
      name: 'Javascript Lovers',
      desc: 'It is a long established fact that a user will be diverted',
      thumb: '/assets/images/wall/suggestion.png',
    },
  ],
};

export const postsList: PostObjType[] = [
  {
    id: 123,
    owner: {
      name: 'Cripton Rice',
      profilePic: '/assets/images/avatar/A18.jpg',
      id: 323445,
    },
    date: getFormattedDateTime(-1, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
    attachments: [
      {
        id: 5445,
        path: '/assets/images/wall/berlin.jpg',
        preview: '/assets/images/wall/berlin.jpg',
        metaData: { type: 'images/jpg', size: 2343 },
      },
      {
        id: 54546,
        path: '/assets/images/wall/cairo.jpg',
        preview: '/assets/images/wall/cairo.jpg',
        metaData: { type: 'images/jpg', size: 2345 },
      },
      {
        id: 54547,
        path: '/assets/images/wall/berlin.jpg',
        preview: '/assets/images/wall/berlin.jpg',
        metaData: { type: 'images/jpg', size: 2346 },
      },
    ],
    message: 'Beautiful cities of Europe...',
    liked: true,
    likes: 324,
    shares: 45,
    views: 3456,
    comments: [
      {
        id: 324,
        author: {
          name: 'John Doe',
          profilePic: '/assets/images/avatar/A2.jpg',
          id: 3423,
        },
        liked: true,
        message_type: MessageType.TEXT,
        comment: 'Wow! these pics are so mesmerizing.',
        date: getFormattedDateTime(-1, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
      },
      {
        id: 324,
        author: {
          name: 'James Jennie',
          profilePic: '/assets/images/avatar/A10.jpg',
          id: 343432,
        },
        liked: true,
        message_type: MessageType.MEDIA,
        comment: '',
        media: {
          id: generateUniqueID(),
          url: '/assets/images/wall/fman.jpg',
          mime_type: 'image/jpg',
        },
        date: getFormattedDateTime(-1, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
      },
    ],
  },
  {
    id: 3443,
    owner: {
      name: 'John Buchanan',
      profilePic: '/assets/images/avatar/A3.jpg',
      id: 3243,
    },
    date: getFormattedDateTime(-2, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
    attachments: [
      {
        id: 5445,
        path: '/assets/images/wall/berlin.jpg',
        preview: '/assets/images/wall/berlin.jpg',
        metaData: { type: 'images/jpg', size: 2343 },
      },
      {
        id: 54546,
        path: '/assets/images/wall/cairo.jpg',
        preview: '/assets/images/wall/cairo.jpg',
        metaData: { type: 'images/jpg', size: 2345 },
      },
    ],
    message: 'Amazing clicks from my camera!',
    liked: false,
    likes: 435,
    shares: 34,
    views: 6544,
    comments: [
      {
        id: 5465,
        author: {
          name: 'James Jennie',
          profilePic: '/assets/images/avatar/A10.jpg',
          id: 343432,
        },
        message_type: MessageType.TEXT,
        liked: true,
        comment: 'Wow! Excellent, these images are so beautiful.',
        date: getFormattedDateTime(0, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
      },
    ],
  },
  {
    id: 3454,
    owner: {
      name: 'Josh Blake',
      profilePic: '/assets/images/avatar/A12.jpg',
      id: 32434,
    },
    date: getFormattedDateTime(-3, 'days', 'ddd MMM DD YYYY kk:mm:ss Z'),
    attachments: [
      {
        id: 54546,
        path: '/assets/images/wall/cairo.jpg',
        preview: '/assets/images/wall/cairo.jpg',
        metaData: { type: 'images/jpg', size: 2345 },
      },
    ],
    content: '',
    liked: true,
    likes: 4343,
    shares: 34,
    views: 3243,
    comments: [],
  },
];
