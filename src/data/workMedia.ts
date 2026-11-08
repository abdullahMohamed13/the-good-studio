export const workMedia = [
  {
    id: "work-01",
    type: "video",
    src: "https://res.cloudinary.com/uwwnts8h/video/upload/v1794005249/vid-4_hriniw.mp4",
  },
  {
    id: "work-02",
    type: "image",
    src: "https://res.cloudinary.com/uwwnts8h/image/upload/v1794005200/img-1_grwh59.jpg",
  },
  {
    id: "work-03",
    type: "image",
    src: "https://res.cloudinary.com/uwwnts8h/image/upload/v1794005204/img-3_grjxrp.jpg",
  },
  {
    id: "work-04",
    type: "video",
    src: "https://res.cloudinary.com/uwwnts8h/video/upload/v1794005243/vid-6_lvgkld.mp4",
  },
  {
    id: "work-05",
    type: "image",
    src: "https://res.cloudinary.com/uwwnts8h/image/upload/v1794005207/img-4_y6ul9f.jpg",
  },
  {
    id: "work-06",
    type: "image",
    src: "https://res.cloudinary.com/uwwnts8h/image/upload/v1794005209/img-5_iesfy5.jpg",
  },
  {
    id: "work-07",
    type: "video",
    src: "https://res.cloudinary.com/uwwnts8h/video/upload/v1794005205/vid-1_e3ydqg.mp4",
  },
  {
    id: "work-08",
    type: "image",
    src: "https://res.cloudinary.com/uwwnts8h/image/upload/v1794005209/img-6_icaipc.jpg",
  },
  {
    id: "work-09",
    type: "image",
    src: "https://res.cloudinary.com/uwwnts8h/image/upload/v1794005213/img-9_srsjpk.jpg",
  },
  {
    id: "work-10",
    type: "video",
    src: "https://res.cloudinary.com/uwwnts8h/video/upload/v1794005197/vid-2_yfxbmf.mp4",
  },
  {
    id: "work-11",
    type: "video",
    src: "https://res.cloudinary.com/uwwnts8h/video/upload/v1794005192/vid-5_qih2sb.mp4",
  },
  {
    id: "work-12",
    type: "video",
    src: "https://res.cloudinary.com/uwwnts8h/video/upload/v1794005860/d22f83b9c6f7341f4e44b7dee635f627_720w_zqfvay.mp4",
  },
  {
    id: "work-13",
    type: "image",
    src: "https://res.cloudinary.com/uwwnts8h/image/upload/v1794005239/img-10_lzyto8.jpg",
  },
  {
    id: "work-14",
    type: "video",
    src: "https://res.cloudinary.com/uwwnts8h/video/upload/v1794005862/1efa71216859cc85bfb7f73050a6fc7b_feikxs.mp4",
  },
  {
    id: "work-15",
    type: "image",
    src: "https://res.cloudinary.com/uwwnts8h/image/upload/v1794006012/__zkrf5p.jpg",
  },
  {
    id: "work-16",
    type: "video",
    src: "https://res.cloudinary.com/uwwnts8h/video/upload/v1794005209/vid-3_zqqrt2.mp4",
  },
  {
    id: "work-17",
    type: "image",
    src: "https://res.cloudinary.com/uwwnts8h/image/upload/v1794005220/img-2_mctwla.jpg",
  },
  {
    id: "work-18",
    type: "image",
    src: "https://res.cloudinary.com/uwwnts8h/image/upload/v1794005247/img-7_o5v6d9.jpg",
  },
  {
    id: "work-19",
    type: "video",
    src: "https://res.cloudinary.com/uwwnts8h/video/upload/v1794005863/f10132256225521daf2801019985922b_kussbv.mp4",
  },
  {
    id: "work-20",
    type: "image",
    src: "https://res.cloudinary.com/uwwnts8h/image/upload/v1794006037/__afr539.gif",
  },
] as const;

export type WorkId = (typeof workMedia)[number]["id"];
export type WorkMediaItem = (typeof workMedia)[number];
