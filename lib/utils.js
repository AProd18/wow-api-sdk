export function regionHost(region) {
  const map = {
    us: "us.api.blizzard.com",
    eu: "eu.api.blizzard.com",
    kr: "kr.api.blizzard.com",
    tw: "tw.api.blizzard.com",
    cn: "gateway.battlenet.com.cn",
  };

  return map[region.toLowerCase()] || map["eu"]; // default: EU
}
