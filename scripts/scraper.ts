import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

const pages: string[] = [
  'https://sanguoshaenglish.blogspot.com/2010/07/liu-bei.html',
  'https://sanguoshaenglish.blogspot.com/2010/07/elder-zhu-ge-liang.html',
  'https://sanguoshaenglish.blogspot.com/2010/07/zhao-yun.html',
  'https://sanguoshaenglish.blogspot.com/2010/07/guan-yu.html',
  'https://sanguoshaenglish.blogspot.com/2010/07/huang-yue-ying.html',
  'https://sanguoshaenglish.blogspot.com/2010/07/ma-chao.html',
  'https://sanguoshaenglish.blogspot.com/2010/07/zhang-fei.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/younger-zhu-ge-liang.html',
  'https://sanguoshaenglish.blogspot.com/2010/07/pang-tong.html',
  'https://sanguoshaenglish.blogspot.com/2010/07/huang-zhong.html',
  'https://sanguoshaenglish.blogspot.com/2010/07/wei-yan.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/meng-huo.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/zhu-rong.html',
  'https://sanguoshaenglish.blogspot.com/2011/07/fa-zheng.html',
  'https://sanguoshaenglish.blogspot.com/2011/06/ma-su.html',
  'https://sanguoshaenglish.blogspot.com/2011/06/xu-shu.html',
  'https://sanguoshaenglish.blogspot.com/2011/08/liu-shan.html',
  'https://sanguoshaenglish.blogspot.com/2011/08/jiang-wei.html',
  'https://sanguoshaenglish.blogspot.com/2011/11/sun-shang-xiang-sp.html',
  'https://sanguoshaenglish.blogspot.com/2012/06/ma-dai.html',
  'https://sanguoshaenglish.blogspot.com/2012/06/liao-hua.html',
  'https://sanguoshaenglish.blogspot.com/2012/06/guan-xing-zhang-bao.html',
  'https://sanguoshaenglish.blogspot.com/2012/05/zhang-fei-sp005.html',
  'https://sanguoshaenglish.blogspot.com/2012/08/liu-bei-sp007.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/cao-cao.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/guo-jia.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/si-ma-yi.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/xia-hou-dun.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/xu-chu.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/zhang-liao.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/zhen-ji.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/dian-wei.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/xun-yu.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/cao-ren.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/xia-hou-yuan.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/cao-pi.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/xu-huang.html',
  'https://sanguoshaenglish.blogspot.com/2011/06/cao-zhi.html',
  'https://sanguoshaenglish.blogspot.com/2011/06/yu-jin.html',
  'https://sanguoshaenglish.blogspot.com/2011/06/zhang-chun-hua.html',
  'https://sanguoshaenglish.blogspot.com/2011/08/deng-ai.html',
  'https://sanguoshaenglish.blogspot.com/2011/08/zhang-he.html',
  'https://sanguoshaenglish.blogspot.com/2011/10/translated-description-genius.html',
  'https://sanguoshaenglish.blogspot.com/2011/11/guan-yu-sp.html',
  'https://sanguoshaenglish.blogspot.com/2011/11/pang-de-sp006.html',
  'https://sanguoshaenglish.blogspot.com/2011/12/cai-wen-ji-lady-cai-sp009.html',
  'https://sanguoshaenglish.blogspot.com/2012/01/jia-xu-sp012.html',
  'https://sanguoshaenglish.blogspot.com/2012/05/xun-you.html',
  'https://sanguoshaenglish.blogspot.com/2012/05/cao-zhang.html',
  'https://sanguoshaenglish.blogspot.com/2012/05/wang-yi.html',
  'https://sanguoshaenglish.blogspot.com/2012/08/zhong-hui.html',
  'https://sanguoshaenglish.blogspot.com/2012/04/cao-ren-sp003.html',
  'https://sanguoshaenglish.blogspot.com/2012/08/wang-yuanji-sticker-add-on.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/sun-quan.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/da-qiao.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/gan-ning.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/huang-gai.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/lu-meng.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/lu-xun.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/sun-shang-xiang.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/zhou-yu.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/tai-shi-ci.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/xiao-qiao.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/zhou-tai.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/sun-jian.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/lu-su.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/ling-tong.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/wu-guo-tai-lady-wu.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/xu-sheng.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/zhang-zhao-zhang-hong.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/sun-ce.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/bu-lianshi.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/han-dang.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/cheng-pu.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/lu-meng-sp006_6.html',
  'https://sanguoshaenglish.blogspot.com/2013/03/da-qiao-sp008_6.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/diao-chan.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/hua-tuo.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/lu-bu.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/yuan-shao.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/pang-de.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/yan-liang-wen-chou.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/zhang-jiao.html',
  'https://sanguoshaenglish.blogspot.com/2010/08/yu-ji.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/dong-zhuo.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/jia-xu.html',
  'https://sanguoshaenglish.blogspot.com/2011/07/gao-shun.html',
  'https://sanguoshaenglish.blogspot.com/2011/07/chen-gong.html',
  'https://sanguoshaenglish.blogspot.com/2011/08/cai-wen-ji-lady-cai.html',
  'https://sanguoshaenglish.blogspot.com/2011/08/zuo-ci.html',
  'https://sanguoshaenglish.blogspot.com/2011/10/diao-chan-sp.html',
  'https://sanguoshaenglish.blogspot.com/2011/11/gongsun-zan.html',
  'https://sanguoshaenglish.blogspot.com/2011/11/yuan-shu.html',
  'https://sanguoshaenglish.blogspot.com/2012/03/ma-chao-sp011.html',
  'https://sanguoshaenglish.blogspot.com/2012/07/hua-xiong.html',
  'https://sanguoshaenglish.blogspot.com/2012/07/liu-biao.html',
  'https://sanguoshaenglish.blogspot.com/2012/02/zhao-yun-sp001.html',
  'https://sanguoshaenglish.blogspot.com/2012/03/diao-chan-sp002.html',
  'https://sanguoshaenglish.blogspot.com/2012/04/pang-tong-sp004.html',
  'https://sanguoshaenglish.blogspot.com/2012/09/gan-ning-sp009.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/demi-god-zhu-ge-liang.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/demi-god-zhou-yu.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/demi-god-guan-yu.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/demi-god-lu-meng.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/demi-god-cao-cao.html',
  'https://sanguoshaenglish.blogspot.com/2010/09/demi-god-lu-bu.html',
  'https://sanguoshaenglish.blogspot.com/2011/08/demi-god-sima-yi.html',
  'https://sanguoshaenglish.blogspot.com/2011/08/demi-god-zhao-yun.html',
  'https://sanguoshaenglish.blogspot.com/2011/12/lu-bu-sp008.html',
  'https://sanguoshaenglish.blogspot.com/2011/12/lu-bu-sp008.html',
]

async function execute(pageUrl: string) {
  const response = await fetch(pageUrl)
  const body = await response.text()
  const $ = cheerio.load(body)
  const imageUrl = $(
    '#Blog1 > div.blog-posts.hfeed > div > div > div > div.post.hentry > div.cover > div > div > a > img',
  ).attr('src')
  const description = $(
    '#Blog1 > div.blog-posts.hfeed > div > div > div > div.post.hentry > div.cover > div > div > b:nth-child(5) > span',
  ).text()
  const name = $(
    '#Blog1 > div.blog-posts.hfeed > div > div > div > div.post.hentry > div.bposttitle > h2 > a',
  ).text()
  const abilityElements = $(
    '#Blog1 > div.blog-posts.hfeed > div > div > div > div.post.hentry > div.cover > div > div > div:nth-child(12) > div',
  )
  const abilities = []
  for (const ability of abilityElements) {
    const name = $(ability).find('b').text()
    const description = $(ability).text()
    abilities.push({
      name,
      description,
    })
  }
  console.log({
    imageUrl,
    description,
    name,
    abilities,
  })
}

console.log('scraper starting')
for (const page of [pages[0]]) {
  await execute(page)
}
