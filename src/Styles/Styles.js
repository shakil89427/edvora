export const headerStyles = {
  main: "bg-[#101010] flex items-center justify-between px-10 py-4",
  heading: "text-3xl font-bold",
  profileWrapper: "flex items-center gap-3",
  name: "text-md font-semibold",
  img: "w-10 h-10 rounded-full",
};

export const bodyStyles = {
  bodyMain: "mx-3 md:mx-10 py-2 md:py-5",
  bodyHeadWrapper: "flex items-center justify-between relative",
};

export const navigatorStyles = {
  buttonWrapper:
    "flex flex-col md:flex-row items-center gap-1 md:gap-7 text-[#b9b4b4]",
  buttonActive: "border-b-2 text-white",
  buttonInActive: "cursor-pointer",
  filterButton: "flex items-center gap-2",
};

export const filterStyles = {
  mainActive: "rounded-lg bg-[#131313] w-32 p-2 absolute right-0 top-0",
  mainInActive: "absolute right-0 top-50 md:top-0",
  filterDiv: "flex items-center gap-2 pl-2 cursor-pointer",
  activeWrapper: "bg-[#232323] mt-2 px-1 cursor-pointer relative",
  mainBtn: "flex items-center justify-between",
  itemsWrapper:
    "absolute top-full bg-[#232323] left-0 w-full max-h-64 overflow-y-scroll scrollbar-hide z-10",
  item: "bg-[#110e0e] text-sm py-1 hover:bg-gray-200 hover:text-black px-1",
};

export const showRideStyles = {
  main: "flex flex-col md:flex-row justify-between bg-[#171717] p-3 md:p-5 my-4 rounded-lg",
  leftMain: "flex items-center gap-4 text-[#b9b4b4] mb-2 md:mb-0 pb-2 mb:pb-0",
  img: "w-fit h-fit",
  spec: "ml-1 text-white",
  locationMain: "flex gap-2 lg:gap-5 justify-center",
  location: "bg-[#0a0a0a] h-fit rounded-lg px-3",
};
