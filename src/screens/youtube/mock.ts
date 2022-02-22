interface Subcontent {
  id: string;
  title: string;
  channel: string;
  image: any;
}

export const subcontents: Subcontent[] = [
  {
    id: "1",
    title: "말년을 건강하게",
    channel: "M드로메다",
    image: require("../../assets/images/subcontents/malgun.png"),
  },
  {
    id: "2",
    title: "침착한 주말",
    channel: "MBCentertainment",
    image: require("../../assets/images/subcontents/jumal.jpeg"),
  },
  {
    id: "3",
    title: "배성재의 TEN",
    channel: "SBS Radio 에라오",
    image: require("../../assets/images/subcontents/ten.jpeg"),
  },
  {
    id: "4",
    title: "라면꼰대",
    channel: "THE BOB - 더 밥 스튜디오",
    image: require("../../assets/images/subcontents/ramyeon.jpeg"),
  },
  {
    id: "5",
    title: "거침마당",
    channel: "카카오TV",
    image: require("../../assets/images/subcontents/madang.jpeg"),
  },
];
