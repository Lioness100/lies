import { Manager } from "discord-hybrid-sharding";
import "./lib/setup/index";

const client = new Manager("dist/bot.js", {
  totalShards: "auto",
  totalClusters: 1,
  mode: "process",
  usev13: true,
  token: process.env.token,
});

client.on("clusterCreate", (cluster) =>
  console.log(`Cluster ${cluster.id} Has Been Launched, Now Starting Bot`)
);
client.spawn(undefined, undefined, -1);
