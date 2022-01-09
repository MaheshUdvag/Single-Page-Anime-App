export const render = () => {
  return `
  <div style="margin-bottom:10px">
  <div style="width: 100%;height: 30vh;">
    <img
      style="width: 100%;height: 30vh;"
      src="https://media.kitsu.io/anime/cover_images/210/original.jpg"
    />
  </div>
  <div style="display: flex;margin-top: 30px;justify-content: center;align-items: flex-start;flex-wrap: wrap;">
    <img
      style="width: 200px;height: auto;padding:10px;"
      src="https://media.kitsu.io/anime/poster_images/11/original.jpg"
    />
    <div style="background: #3e3e3e;color: #f7f7f7;opacity: 0.7;">
      <div
        style="max-width: 900px;
        padding: 10px;
        margin: 5px;"
      >
        <h2>Naruto</h2>
        <p style="max-height: 20vh;overflow: hidden;margin-bottom: 5px">
          Moments prior to Naruto Uzumaki's birth, a huge demon known as the
          Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf
          Village, and wreaked havoc. In order to put an end to the Kyuubi's
          rampage, the leader of the village, the Fourth Hokage, sacrificed his
          life and sealed the monstrous beast inside the newborn Naruto.\nNow,
          Naruto is a hyperactive and knuckle-headed ninja still living in
          Konohagakure. Shunned because of the Kyuubi inside him, Naruto
          struggles to find his place in the village, while his burning desire
          to become the Hokage of Konohagakure leads him not only to some great
          new friends, but also some deadly foes.\n[Written by MAL Rewrite]
        </p>
        <div>
          <p style="padding: 5px;">Average Rating: 79.91</p>
          <p style="padding: 5px;">startDate: 2002-10-03</p>
          <p style="padding: 5px;">endDate: 2007-02-08</p>
          <p style="padding: 5px;">status: finished</p>
          <p style="padding: 5px;">episodeCount: 220</p>
          <p style="padding: 5px;">episodeLength: 23</p>
        </div>
      </div>
    </div>
  </div>
  <div style="display: flex;margin-top: 30px;justify-content: center;align-items: flex-start;flex-wrap: wrap;">
  <iframe class="responsive-iframe" style="width: 50vw;height: 25vh;" src="https://www.youtube.com/embed/nOevg_8lIos"></iframe>
  </div>
</div>
    `;
};

export const showIndexPage = async () => {};
