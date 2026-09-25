// Avisa Bing/Yandex/etc. (IndexNow) de todas as URLs do sitemap em produção.
// Uso: npm run indexnow  (rode depois que o deploy estiver no ar)

const SITE = "https://www.jpnobrega.me";
const KEY = "3a2289d808a1dbba6613d24c6307bbe7";

const sitemap = await fetch(`${SITE}/sitemap.xml`).then((res) => res.text());
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => url.startsWith(SITE));

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow: ${res.status} ${res.statusText} — ${urlList.length} URLs enviadas`);
if (!res.ok) {
  console.log(await res.text());
  process.exit(1);
}
