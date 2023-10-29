import students from "../data/students.json";
import english_rewards from "../data/english_rewards.json";
import english_punishments from "../data/english_punishments.json";

type Gachas = {
  name: string;
  description: string;
  items: string[];
  font: number;
}[];

export default [
  {
    name: "随机点名",
    description: "在名单中随机抽取一位同学",
    items: students,
    font: 12,
  },
  {
    name: "英语抽奖 (章)",
    description: "「我要零食！零食的概率改成70%！」",
    items: english_rewards,
    font: 8,
  },
  {
    name: "英语抽奖 (叉)",
    description: "「课上唱一首歌！」",
    items: english_punishments,
    font: 8,
  },
] as Gachas;
