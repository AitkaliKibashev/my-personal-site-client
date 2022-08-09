import React from 'react';
import './AboutMe.scss'

const AboutMe = () => {
    return (
        <section className="about-me">
            <div className="container">
                <h1 className="section-title">Обо мне</h1>
                <p>
                    Я начинающий Frontend разработчик. Немного изучил backend для себя, хотя думаю это должно быть частью обучение Фронту. В целом мне интересно все, что
                    связано с технологиями. Уже год как в вебе, начал изучать фронт пол года назад, до этого занимался фрилансом в качестве Веб-Мастера.
                </p>
                <p>
                    Я большой любитель практики.
                </p>
                <p>
                    Долго думал насчет полезного пет-проекта в итоге пришел к созданию личного сайта, чтобы структировать информацию о себе и делиться своими мыслями. Вот что из этого вышло.
                </p>
                <h2>Что я знаю, умею</h2>
                <ul>
                    <li>- HTML, CSS(SASS), JS</li>
                    <li>- React, Redux(RTK, Saga), TypeScript</li>
                    <li>- Vue 3, Vuex, Composition API</li>
                    <li>- Python, Django, DRF</li>
                    <li>- KISS, DRY, SOLID</li>
                    <li>- ООП, ФП</li>
                    <li>- SSR, Rest API, WebSocket</li>
                </ul>
                <h2>Мое резюме</h2>
                <a href="/cv.pdf">Вот тут, тык</a>
            </div>
        </section>
    );
};

export default AboutMe;