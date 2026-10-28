/**
 * 학술지 규정 포털 MPA 인터랙션 스크립트 (portal.js)
 * - 설계 및 감수: 편집자 꾸꾸팩 (kunwryu_editor, localcrab)
 * - UDL 2025 & WCAG 2.1 AA 실무 구현
 * - 독립 페이지(MPA) 방식: 브라우저 네이티브 하이퍼링크 기반 무결점 동작
 */

function initAll() {
    initCopyButtons();
    initHavrutaAccordions();
    initCitationConverter();
    initMetacognitiveChecklist();
    initScrollSpyAndFloatingBtn();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

/* ==========================================================================
   1. 원터치 고대비 복사 기능 (copy to clipboard)
   ========================================================================== */
function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const targetSelector = btn.getAttribute('data-copy-target');
            let textToCopy = '';

            if (targetSelector) {
                const targetEl = document.querySelector(targetSelector);
                textToCopy = targetEl ? targetEl.innerText : '';
            } else {
                const pre = btn.closest('.example-box')?.querySelector('pre');
                textToCopy = pre ? pre.innerText : '';
            }

            if (!textToCopy) return;

            try {
                await navigator.clipboard.writeText(textToCopy);
                const originalText = btn.innerHTML;
                btn.innerHTML = '✓ 복사 완료';
                btn.style.backgroundColor = '#15803d';
                btn.style.borderColor = '#166534';
                btn.style.color = '#ffffff';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        });
    });
}

/* ==========================================================================
   2. 하브루타 변증법적 아코디언 질의응답 (하브루타 팩 연계)
   ========================================================================== */
function initHavrutaAccordions() {
    document.querySelectorAll('.havruta-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            const content = trigger.nextElementSibling;

            trigger.setAttribute('aria-expanded', !isExpanded);
            if (content) {
                content.classList.toggle('open', !isExpanded);
            }
        });
    });
}

/* ==========================================================================
   3. 실시간 서지 인용 자동 변환기 (action & expression UDL)
   ========================================================================== */
const citationPresets = {
    book_single: {
        name: "일반 저서 (단독 저자)",
        kca_intext: "윤택림(2016: 45-48)에 따르면... / (윤택림 2016: 45-48)",
        kca_ref: "윤택림, 2016, 『구술로 쓰는 역사: 미수복경기도민의 분단과 이산의 삶』, 서울: 아르케.",
        iccs_intext: "윤택림(2016: 45~48)에 따르면... / (윤택림, 2016: 45~48)",
        iccs_ref: "윤택림, 2016, 『구술로 쓰는 역사: 미수복경기도민의 분단과 이산의 삶』, 아르케.",
        diff: "• 본문 괄호 내주: 『비교문화연구』는 저자명 뒤 쉼표 필수(`윤택림, 2016`), 『한국문화인류학』은 쉼표 없음(`윤택림 2016`)\n• 인용 쪽수: 『비교문화연구』는 물결표(`45~48`), 『한국문화인류학』은 하이픈(`45-48`)\n• 출판 정보: 『한국문화인류학』은 출판도시 명기(`서울: 아르케`), 『비교문화연구』는 출판도시 생략(`아르케`)"
    },
    journal_article: {
        name: "학술지 수록 논문 (단독 저자)",
        kca_intext: "박순영(2006: 60)은... / (박순영 2006: 60)",
        kca_ref: `박순영, 2006, "일제 식민주의와 조선인의 몸에 대한 '인류학적' 시선: 조선인 신체에 대한 일제 체질인류학자들의 작업을 중심으로," 『비교문화연구』 12(2): 57-92.`,
        iccs_intext: "박순영(2006: 60)은... / (박순영, 2006: 60)",
        iccs_ref: `박순영, 2006, “일제 식민주의와 조선인의 몸에 대한 ‘인류학적’ 시선: 조선인 신체에 대한 일제 체질인류학자들의 작업을 중심으로”, 『비교문화연구』, 12-2: 57~92, 서울대학교 비교문화연구소.`,
        diff: "• 논문 제목 부호: 『비교문화연구』는 쉼표를 따옴표 밖으로 배치(“논문 제목”,), 『한국문화인류학』은 미국식 관례를 차용하여 따옴표 안에 배치(\"논문 제목,\")\n• 권·호수 표기: 『비교문화연구』는 하이픈(`12-2:`), 『한국문화인류학』은 괄호(`12(2):`)\n• 발행 기관: 『비교문화연구』는 권호수 뒤에 학회/연구소명 병기 허용"
    },
    two_authors: {
        name: "2인 공동 저술 (국문 / 영문)",
        kca_intext: "국문: (김가람·이한결 1990) / 영문: (Kim and Lee 2010)",
        kca_ref: "Kim, Garam and Hangyeol Lee, 2010, Anthropological Approaches, Seoul: Academic Press.",
        iccs_intext: "국문: (노용석·정해조, 2019) / 영문: (Hobsbawm & Ranger, 1983)",
        iccs_ref: "Nielsen, Morten, & Nigel Rapport, 2017, The Composition of Anthropology: How Anthropological Texts Are Written, Routledge.",
        diff: "• 영문 2인 저자 연결: 『비교문화연구』는 앰퍼샌드(`&`) 사용, 『한국문화인류학』은 단어 `and` 사용\n• 본문 내주 쉼표: 『비교문화연구』는 괄호 내주에 연도 앞 쉼표 삽입(`노용석·정해조, 2019`), 『한국문화인류학』은 미삽입(`김가람·이한결 1990`)"
    },
    translation_book: {
        name: "번역서 (외국 저자 번역본)",
        kca_intext: "(기어츠 2009) / 기어츠(2009)",
        kca_ref: "기어츠, 클리퍼드 (이보람 역), 2009, 『문화의 해석』, 서울: 까치.",
        iccs_intext: "(에이블먼, 2014: 58~60)",
        iccs_ref: "에이블먼, 낸시(저), 강신표·박찬희(역), 2014[2003], 『사회이동과 계급, 그 멜로드라마: 미국 인류학자가 만난 한국 여성들의 이야기』, 일조각.",
        diff: "• 원서 출간연도 병기: 『비교문화연구』는 번역서 연도 뒤 대괄호 안에 원서 연도 의무 병기(`2014[2003]`)\n• 역할 표기: 『비교문화연구』는 `(저)`, `(역)` 괄호 병기, 『한국문화인류학』은 `(역자명 역)` 형식 사용"
    },
    stat_data: {
        name: "통계 및 공공자료 (<자료> 섹션)",
        kca_intext: "본문 또는 각주에서 (통계청 2012)로 인용",
        kca_ref: "<자료>\n통계청, 2012, 『2012년도 통계연보』, 서울: 통계청.",
        iccs_intext: "본문 또는 각주에서 (통계청, 2013)으로 인용",
        iccs_ref: "<자료>\n통계청, 2013, 「2012년도 통계연보」.",
        diff: "• 자료 제목 부호: 『비교문화연구』는 법령 및 공공자료집 제목에 **홑낫표(「 」)** 사용! 『한국문화인류학』은 단행본 형태 자료에 **겹낫표(『 』)** 사용\n• 자료 섹션 정렬 체계: 『비교문화연구』는 기관자료 → 기명 기사 → 무기명 기사 순 정렬, 『한국문화인류학』은 단행본 형태 → 정기간행물 → 인터넷 순 정렬"
    },
    data_news_magazine: {
        name: "신문 및 잡지 기사 (<자료> 섹션)",
        kca_intext: "본문 또는 각주에서 (시사저널 2009: 27-28) 또는 (한겨레 2014)로 인용",
        kca_ref: "<자료>\n『시사저널』, “우리는 인류학 연구방법을 어떻게 가르치고 있는가?”(김가람), 2009. 10. 15일자, pp.27-28.\n『한겨레』, 2014. 3. 15일자.\nNew York Times, 2009. 7. 18일자.",
        iccs_intext: "본문 또는 각주에서 (주간경향, 2009) 또는 (Harari, 2020)으로 인용",
        iccs_ref: "<자료>\n주간경향, 2009. 12. 29., “2009 최대의 사건은 ‘용산참사’”.\nNew York Times, 2020. 3. 20., “In Europe, Coronavirus Crisis Keeps Getting Worse”.\nHarari, Yuval Noah, 2020. 3. 30., “The World after Coronavirus”, Financial Times.",
        diff: "• 매체명 부호: 『한국문화인류학』은 잡지/신문명에 겹낫표(『 』) 표기(`『시사저널』`, `『한겨레』`), 『비교문화연구』는 일반 텍스트 표기(`주간경향`, `Financial Times`)\n• 날짜 서식: 『한국문화인류학』은 '일자' 부기(`2009. 10. 15일자`), 『비교문화연구』는 마침표 표기(`2009. 12. 29.,`)\n• 기명 기사: 『한국문화인류학』은 기사명 뒤 괄호로 기자명 부기(`(김가람)`), 『비교문화연구』는 저자-연도 선두 표기(`Harari, Yuval Noah, 2020`)"
    },
    data_internet: {
        name: "인터넷 웹자료 (<자료> 섹션)",
        kca_intext: "본문 인용 시 각주로 표기:\n한국문화인류학회, \"한국문화인류학 집필요강,\" http://www.koanthro.or.kr/introduce/contribution.htm (2015. 7. 15. 접속).",
        kca_ref: "<자료>\n전인류, 2010, “한국 인류학의 미래,” http://koantrho.or.kr/article.html (2015. 7. 15. 접속).\n한국문화인류학회, “한국문화인류학 집필 요강,” http://www.koanthro.or.kr/introduce/contribution.htm (2015. 7. 15. 접속).",
        iccs_intext: "본문 또는 각주에서 (전인류, 2010) 또는 URL 각주로 인용",
        iccs_ref: "<자료>\n전인류, 2010, “한국 인류학의 미래”, http://koanthro.or.kr/article.html, (2015. 7. 15. 접속).\n빅카인즈, “문화이주” & “제주”, 2012. 1. 1.~2017. 1. 1., https://www.bigkinds.or.kr/v2/news/search.do, (2025. 10. 15. 검색).",
        diff: "• 본문 인용 원칙: 『한국문화인류학』은 본문 중에 각주를 달아 작성자(기관명), 제목, URL, 접속 일자를 밝힘\n• URL 뒤 쉼표: 『비교문화연구』는 URL 뒤에 쉼표 후 `(2015. 7. 15. 접속).` 표기, 『한국문화인류학』은 URL 바로 뒤 공백 후 괄호 병기"
    },
    data_law_history: {
        name: "법령 및 공공 사료 (<자료> 섹션)",
        kca_intext: "본문 또는 각주에서 (통계청 2012) 등으로 인용",
        kca_ref: "<자료>\n통계청, 2012, 『2012년도 통계연보』, 서울: 통계청.",
        iccs_intext: "본문 또는 각주에서 (진천군지편찬위원회, 1994) 또는 「노인장기요양법」(2024)으로 인용",
        iccs_ref: "<자료>\n진천군지편찬위원회, 1994, 「진천군지」.\n「노인장기요양법」, 법률 제20587호, 2024. 12. 20. 일부개정, 2025. 6. 21. 시행.",
        diff: "• 법령 및 사료 제목 부호: 『비교문화연구』는 법령이나 공공자료집 제목에 반드시 **홑낫표(「 」)** 사용 (`「노인장기요양법」`, `「진천군지」`)\n• 단행본 형태: 『한국문화인류학』은 단행본 형태 자료는 겹낫표(『 』)를 사용하고 저술과 마찬가지로 출판장소/출판사 명기"
    },
    proceeding_paper: {
        name: "학술대회 발표논문 (프로시딩)",
        kca_intext: "(김가람 2005: 28-30)",
        kca_ref: "김가람, 2005, “지역 감정과 지역 정치,” 『제37차 한국문화인류학회 전국대회 발표논문집』, pp.28-39.",
        iccs_intext: "(안승택, 2019)",
        iccs_ref: "안승택, 2019. 11., “‘감옥’으로부터의 모색: 현장, 문화, 공동체의 재고를 위한 한국농촌연구노트”, 2019 한국문화인류학회 추계학술대회, 안동.\nAntona, Laura, 2018. 8., “Confinement at Home/work, in Shelter and in a Country: the (Im)mobility of Migrant Domestic Workers in Singapore”, 15th EASA Biennial Conference, Stockholm.",
        diff: "• 개최 도시명 표기: 『비교문화연구』는 **학술대회명 뒤에 개최 도시명(안동, 스톡홀름 등)을 반드시 병기**하고 발표 연월(`2019. 11.`)까지 표기\n• 수록논문집 표기: 『한국문화인류학』은 발표논문집 제목을 겹낫표(`『 ``)로 표기하고 수록 쪽수(pp.) 명기"
    },
    thesis_paper: {
        name: "석·박사 학위논문",
        kca_intext: "(황세찬 1999)",
        kca_ref: "황세찬, 1999, “민족지적 권위에 대한 연구: 말리노프스키의 ‘일기’를 중심으로,” 한국대 석사학위 논문.\n________ 2007, “선물의 하우: 멜라네시아의 쿨라에 대한 사례 연구,” 한국대 박사학위 논문.",
        iccs_intext: "(김은정, 2019)",
        iccs_ref: "김은정, 2019, “아무나 시작할 수 있지만 누구나 성공할 수 없다: 다단계 마케팅 참여자에 관한 문화기술지”, 전북대학교 문화인류학 석사학위논문.\nAguilar, Erick, 2019, “A Home of Our Own: Social Reproduction of a Precarious, Migrant Class”, Ph.D. Thesis, Anthropology, Duke University.",
        diff: "• 제목 뒤 쉼표 위치: 『비교문화연구』는 큰따옴표 밖(`”,`), 『한국문화인류학』은 큰따옴표 안(`,”`)\n• 본문 내주: 『비교문화연구』는 저자명 뒤 쉼표 필수(`김은정, 2019`), 『한국문화인류학』은 쉼표 없음(`황세찬 1999`)"
    }
};

function initCitationConverter() {
    const presetSelect = document.getElementById('converter-preset-select');
    if (!presetSelect) return;

    function applyPreset(key) {
        const data = citationPresets[key];
        if (!data) return;

        const kcaIntext = document.getElementById('kca-intext-res');
        const kcaRef = document.getElementById('kca-ref-res');
        const iccsIntext = document.getElementById('iccs-intext-res');
        const iccsRef = document.getElementById('iccs-ref-res');
        const diffDesc = document.getElementById('converter-diff-notes');

        if (kcaIntext) kcaIntext.innerText = data.kca_intext;
        if (kcaRef) kcaRef.innerText = data.kca_ref;
        if (iccsIntext) iccsIntext.innerText = data.iccs_intext;
        if (iccsRef) iccsRef.innerText = data.iccs_ref;
        if (diffDesc) diffDesc.innerText = data.diff;
    }

    presetSelect.addEventListener('change', (e) => {
        applyPreset(e.target.value);
    });

    applyPreset(presetSelect.value);
}

/* ==========================================================================
   4. 메타인지 투고 자가진단 체크리스트 (engagement UDL)
   ========================================================================== */
function initMetacognitiveChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    if (!checkboxes || checkboxes.length === 0) return;

    const progressFill = document.getElementById('checklist-progress-fill');
    const progressCount = document.getElementById('checklist-progress-count');
    const STORAGE_KEY = 'kca_iccs_submission_checklist_v1';

    let savedState = {};
    try {
        savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
        savedState = {};
    }

    function updateProgress() {
        let checkedCount = 0;
        checkboxes.forEach((cb, idx) => {
            const itemBox = cb.closest('.checklist-item');
            if (cb.checked) {
                checkedCount++;
                itemBox?.classList.add('checked');
            } else {
                itemBox?.classList.remove('checked');
            }
            savedState[idx] = cb.checked;
        });

        const percent = Math.round((checkedCount / checkboxes.length) * 100);
        if (progressFill) progressFill.style.width = `${percent}%`;
        if (progressCount) progressCount.innerText = `${checkedCount} / ${checkboxes.length} (${percent}%)`;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
        } catch (e) {}
    }

    checkboxes.forEach((cb, idx) => {
        if (savedState[idx]) {
            cb.checked = true;
        }
        cb.addEventListener('change', updateProgress);
    });

    updateProgress();

    const resetBtn = document.getElementById('reset-checklist-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('모든 체크리스트 상태를 초기화하시겠습니까?')) {
                checkboxes.forEach(cb => cb.checked = false);
                savedState = {};
                try {
                    localStorage.removeItem(STORAGE_KEY);
                } catch (e) {}
                updateProgress();
            }
        });
    }
}

/* ==========================================================================
   5. 스크롤스파이 및 플로팅 TOP 버튼
   ========================================================================== */
function initScrollSpyAndFloatingBtn() {
    const topBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn?.classList.add('visible');
        } else {
            topBtn?.classList.remove('visible');
        }
    });

    topBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const links = document.querySelectorAll('.sidebar-link, .sub-nav-btn');
    if (!links || links.length === 0) return;

    const sections = Array.from(links).map(link => {
        const id = link.getAttribute('href')?.replace('#', '');
        return id ? document.getElementById(id) : null;
    }).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                links.forEach(l => {
                    const match = l.getAttribute('href') === `#${id}`;
                    if (l.classList.contains('sidebar-link')) {
                        l.classList.toggle('active', match);
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
}
