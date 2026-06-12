import type { VideoLesson } from "@/lib/types";

export const MOCK_LESSONS: VideoLesson[] = [
  // ─── Lesson 1: Introduction to LabVIEW ────────────────────────────────────
  {
    id: "lesson-intro",
    title: {
      en: "Introduction to LabVIEW",
      ru: "Введение в LabVIEW",
      uz: "LabVIEW dasturiga kirish",
    },
    slug: "introduction",
    category: "data-types",
    difficulty: "beginner",
    durationMinutes: 30,
    thumbnailUrl: "",
    presentationUrl: "/assets/pdfs/introduction.pdf",
    order: 1,
    isPublished: true,
    createdAt: "2026-01-10",
    tags: [
      { en: "Basics", ru: "Основы", uz: "Asoslar" },
      { en: "Getting Started", ru: "Начало работы", uz: "Boshlash" },
      { en: "Graphical Programming", ru: "Графическое программирование", uz: "Grafik dasturlash" },
    ],
    summaries: [
      {
        id: "intro-s1",
        lessonId: "lesson-intro",
        order: 1,
        sectionTitle: {
          en: "Technical Applications Based on Programming",
          ru: "Технические приложения на основе программирования",
          uz: "Dasturlashtirishlar bazasida texnik ilovalar faniga kirish",
        },
        paragraphs: [
          {
            en: "In today's era of modern technology, programming has become an essential part of controlling, monitoring, and automating technical systems. This subject teaches students how to create and manage technical processes using software tools, building both theoretical and practical knowledge of working with devices, processing data, and creating automated systems.",
            ru: "В эпоху современных технологий программирование стало неотъемлемой частью управления, контроля и автоматизации технических систем. Этот предмет учит студентов создавать и управлять техническими процессами с помощью программных средств, формируя теоретические и практические знания по работе с устройствами, обработке данных и созданию автоматизированных систем.",
            uz: "Hozirgi zamonaviy texnologiyalar davrida dasturlash texnik tizimlarni boshqarish, nazorat qilish va avtomatlashtirishning muhim qismiga aylandi. Ushbu fan talabalarga texnik jarayonlarni dasturiy vositalar yordamida yaratish va boshqarish usullarini o'rgatadi hamda qurilmalar bilan ishlash, ma'lumotlarni qayta ishlash va avtomatlashtirilgan tizimlarni yaratish bo'yicha nazariy va amaliy bilimlarni shakllantiradi.",
          },
          {
            en: "The field focuses on software technologies widely used in manufacturing, laboratory systems, industrial automation, and engineering tasks. Students gain skills in working with modern programming environments, creating virtual instruments, and monitoring technical systems.",
            ru: "Дисциплина ориентирована на программные технологии, широко применяемые в производстве, лабораторных системах, промышленной автоматике и инженерных задачах. Студенты приобретают навыки работы в современных средах программирования, создания виртуальных приборов и мониторинга технических систем.",
            uz: "Mazkur fan ishlab chiqarish, laboratoriya tizimlari, sanoat avtomatikasi va muhandislik masalalarida keng qo'llaniladigan dasturiy texnologiyalarni o'rganishga yo'naltirilgan. Talabalar zamonaviy dasturlash muhitlari bilan ishlash, virtual instrumentlar yaratish va texnik tizimlarni monitoring qilish ko'nikmalariga ega bo'ladilar.",
          },
        ],
      },
      {
        id: "intro-s2",
        lessonId: "lesson-intro",
        order: 2,
        sectionTitle: {
          en: "What is LabVIEW?",
          ru: "Что такое LabVIEW?",
          uz: "LabVIEW dasturi haqida umumiy ma'lumot",
        },
        paragraphs: [
          {
            en: "LabVIEW (Laboratory Virtual Instrument Engineering Workbench) is a graphical programming environment developed by National Instruments. Instead of writing plain text code, you build programs using graphical blocks and functions. This is why LabVIEW is widely used in engineering, scientific research, and automation.",
            ru: "LabVIEW (Laboratory Virtual Instrument Engineering Workbench) — это среда графического программирования, разработанная компанией National Instruments. Вместо написания текстового кода вы создаёте программы с помощью графических блоков и функций. Именно поэтому LabVIEW широко применяется в инженерии, научных исследованиях и автоматизации.",
            uz: "LabVIEW (Laboratory Virtual Instrument Engineering Workbench) — bu National Instruments kompaniyasi tomonidan ishlab chiqilgan grafik dasturlash muhiti. Oddiy matnli kod yozish o'rniga grafik bloklar va funksiyalar yordamida dastur yaratiladi. Shu sababli LabVIEW muhandislik, ilmiy tadqiqot va avtomatlashtirish sohalarida keng qo'llaniladi.",
          },
          {
            en: "In LabVIEW the user creates Virtual Instruments (VIs). Each VI consists of a user interface and a block diagram. The Front Panel is the window the user interacts with, while the Block Diagram holds the program logic. Thanks to graphical programming, even complex processes can be built in a simple, understandable way.",
            ru: "В LabVIEW пользователь создаёт виртуальные приборы (VI). Каждый VI состоит из пользовательского интерфейса и блок-диаграммы. Front Panel — это окно взаимодействия с пользователем, а Block Diagram содержит логику программы. Благодаря графическому программированию даже сложные процессы можно строить просто и понятно.",
            uz: "LabVIEW dasturida foydalanuvchi virtual instrumentlar (VI — Virtual Instrument) yaratadi. Har bir virtual instrument foydalanuvchi interfeysi va blok diagrammasidan tashkil topadi. Front Panel foydalanuvchi bilan ishlash oynasi bo'lsa, Block Diagram dastur logikasi joylashgan asosiy qism hisoblanadi. Grafik dasturlash usuli sababli murakkab jarayonlarni ham sodda va tushunarli tarzda yaratish mumkin.",
          },
        ],
      },
      {
        id: "intro-s3",
        lessonId: "lesson-intro",
        order: 3,
        sectionTitle: {
          en: "Application Areas of LabVIEW",
          ru: "Области применения LabVIEW",
          uz: "LabVIEWni qo'llash sohalari",
        },
        paragraphs: [
          {
            en: "LabVIEW is widely used across technical and scientific fields. It is especially important in industrial automation, data acquisition and processing, sensor systems, robotics, and laboratory research.",
            ru: "LabVIEW широко применяется в технических и научных областях. Особенно важную роль он играет в промышленной автоматике, сборе и обработке данных, сенсорных системах, робототехнике и лабораторных исследованиях.",
            uz: "LabVIEW dasturi turli texnik va ilmiy yo'nalishlarda keng qo'llaniladi. Ayniqsa sanoat avtomatikasi, ma'lumotlarni yig'ish va qayta ishlash, sensor tizimlari, robototexnika hamda laboratoriya tadqiqotlarida muhim ahamiyatga ega.",
          },
          {
            en: "With LabVIEW you can read data from devices in real time, analyze it, and display results graphically. It is also used to control electronic devices, build test systems, and monitor production processes — making it a convenient tool with broad capabilities.",
            ru: "С помощью LabVIEW можно получать данные с устройств в реальном времени, анализировать их и выводить результаты в графическом виде. Он также используется для управления электронными устройствами, создания тестовых систем и мониторинга производственных процессов, что делает его удобным инструментом с широкими возможностями.",
            uz: "Dastur yordamida real vaqt rejimida qurilmalardan ma'lumot olish, ularni tahlil qilish va natijalarni grafik ko'rinishda chiqarish mumkin. Shuningdek, LabVIEW elektron qurilmalarni boshqarish, test tizimlarini yaratish va ishlab chiqarish jarayonlarini monitoring qilish uchun ham ishlatiladi. Uning qulay interfeysi va keng imkoniyatlari uni eng samarali vositalardan biriga aylantiradi.",
          },
        ],
      },
      {
        id: "intro-s4",
        lessonId: "lesson-intro",
        order: 4,
        sectionTitle: {
          en: "The LabVIEW Toolset and Its Capabilities",
          ru: "Инструментарий LabVIEW и его возможности",
          uz: "LabVIEW instrumental vositasi va uning imkoniyatlari",
        },
        paragraphs: [
          {
            en: "The main advantage of LabVIEW is its graphical programming technology. It lets you build programs quickly and efficiently using ready-made functional blocks, simplifying development and helping you solve complex technical tasks in a short time.",
            ru: "Главное преимущество LabVIEW — технология графического программирования. Она позволяет быстро и эффективно создавать программы с помощью готовых функциональных блоков, упрощая разработку и помогая решать сложные технические задачи за короткое время.",
            uz: "LabVIEW dasturining asosiy afzalligi uning grafik dasturlash texnologiyasiga asoslanganidir. Dastur foydalanuvchiga tayyor funksional bloklar yordamida tez va samarali dastur yaratish imkonini beradi. Bu dasturlash jarayonini soddalashtiradi va murakkab texnik masalalarni qisqa vaqt ichida hal qilishga yordam beradi.",
          },
          {
            en: "LabVIEW includes many tools for signal processing, mathematical computation, data visualization, hardware communication, and automation. It also works with Arduino, sensors, FPGAs, and other industrial devices. A key strength is the ability to quickly build interactive user interfaces from buttons, indicators, graphs, and controls — making it one of the most convenient tools for engineering applications.",
            ru: "LabVIEW содержит множество инструментов для обработки сигналов, математических вычислений, визуализации данных, связи с оборудованием и автоматизации. Он также работает с Arduino, датчиками, FPGA и другими промышленными устройствами. Важная особенность — возможность быстро создавать интерактивные интерфейсы из кнопок, индикаторов, графиков и элементов управления, что делает его одним из самых удобных инструментов для инженерных приложений.",
            uz: "LabVIEW tarkibida signalni qayta ishlash, matematik hisob-kitoblar, ma'lumotlarni vizuallashtirish, apparat qurilmalar bilan aloqa qilish va avtomatlashtirish uchun ko'plab instrumentlar mavjud. Bundan tashqari, dastur Arduino, sensorlar, FPGA va boshqa sanoat qurilmalari bilan ishlash imkonini beradi. Muhim jihat — turli tugmalar, indikatorlar, grafiklar va boshqaruv elementlari yordamida interaktiv foydalanuvchi interfeysini tez yaratish imkoniyatidir. Shu sababli LabVIEW texnik ilovalarni yaratishda eng qulay dasturlardan biri hisoblanadi.",
          },
        ],
      },
    ],
    visualizationExamples: [
      {
        id: "viz_vi_anatomy",
        lessonId: "lesson-intro",
        order: 1,
        complexity: "simple",
        title: {
          en: "Building an expression: r = √(a·b − c)",
          ru: "Сборка выражения: r = √(a·b − c)",
          uz: "Ifoda qurish: r = √(a·b − c)",
        },
        description: {
          en: "Three controls feed a chain of Multiply, Subtract and Square-root functions — each block fires only once all of its inputs have arrived.",
          ru: "Три входа подаются на цепочку функций умножения, вычитания и квадратного корня — каждый блок срабатывает только когда все его входы готовы.",
          uz: "Uchta kirish koʻpaytirish, ayirish va kvadrat ildiz funksiyalari zanjiriga uzatiladi — har bir blok faqat barcha kirishlari kelganda ishlaydi.",
        },
      },
    ],
  },

  // ─── Lesson 2: Working in the LabVIEW Environment ─────────────────────────
  {
    id: "lesson-environment",
    title: {
      en: "Working in the LabVIEW Environment",
      ru: "Работа в среде LabVIEW",
      uz: "LabVIEW muhitida ishlash",
    },
    slug: "labview-environment",
    category: "structures",
    difficulty: "beginner",
    durationMinutes: 40,
    thumbnailUrl: "",
    presentationUrl: "/assets/pdfs/labview-environment.pdf",
    order: 2,
    isPublished: true,
    createdAt: "2026-01-12",
    tags: [
      { en: "Front Panel", ru: "Front Panel", uz: "Front Panel" },
      { en: "Block Diagram", ru: "Block Diagram", uz: "Block Diagram" },
      { en: "Palettes", ru: "Палитры", uz: "Palitralar" },
    ],
    summaries: [
      {
        id: "env-s1",
        lessonId: "lesson-environment",
        order: 1,
        sectionTitle: {
          en: "Getting to Know the LabVIEW Workspace",
          ru: "Знакомство с рабочей средой LabVIEW",
          uz: "LabVIEW ishchi muhiti bilan tanishish",
        },
        paragraphs: [
          {
            en: "LabVIEW is built around a graphical programming environment that lets you create virtual instruments. When the program starts, you work in the main workspace, which is designed for creating, editing, running, and observing the results of programs.",
            ru: "LabVIEW построен вокруг среды графического программирования, позволяющей создавать виртуальные приборы. При запуске программы вы работаете в основном рабочем пространстве, предназначенном для создания, редактирования, запуска и наблюдения за результатами программ.",
            uz: "LabVIEW dasturi grafik dasturlash muhitiga asoslangan bo'lib, foydalanuvchiga virtual instrumentlar yaratish imkonini beradi. Dastur ishga tushirilganda foydalanuvchi asosiy ishchi muhit oynasi bilan ishlaydi. Ushbu muhit dastur yaratish, tahrirlash, ishga tushirish va natijalarni kuzatish uchun mo'ljallangan.",
          },
          {
            en: "Working in LabVIEW happens mainly through the Front Panel and Block Diagram windows. Every project created is called a Virtual Instrument (VI), and it consists of a user interface together with the program logic.",
            ru: "Работа в LabVIEW происходит в основном через окна Front Panel и Block Diagram. Каждый созданный проект называется виртуальным прибором (VI) и состоит из пользовательского интерфейса и логики программы.",
            uz: "LabVIEW muhitida ishlash jarayoni asosan Front Panel va Block Diagram oynalari orqali amalga oshiriladi. Har bir yaratilgan loyiha virtual instrument (VI) deb ataladi va u foydalanuvchi interfeysi hamda dastur logikasidan tashkil topadi.",
          },
        ],
      },
      {
        id: "env-s2",
        lessonId: "lesson-environment",
        order: 2,
        sectionTitle: {
          en: "The Front Panel Window",
          ru: "Окно Front Panel",
          uz: "Front Panel oynasi",
        },
        paragraphs: [
          {
            en: "The Front Panel is the user interface. It holds various controls and indicators through which the user interacts directly with the program. Typical elements include controls (for input), indicators (for showing results), buttons, numeric controls, and graphs and charts.",
            ru: "Front Panel — это пользовательский интерфейс. Он содержит различные элементы управления и индикаторы, через которые пользователь напрямую взаимодействует с программой. Типичные элементы: элементы управления (для ввода), индикаторы (для вывода результатов), кнопки, числовые поля, а также графики и диаграммы.",
            uz: "Front Panel — bu foydalanuvchi interfeysi. Ushbu oynada turli boshqaruv elementlari va indikatorlar joylashtiriladi, ular orqali foydalanuvchi dastur bilan bevosita ishlaydi. Asosiy elementlar: Controls (ma'lumot kiritish), Indicators (natijalarni ko'rsatish), Buttons (tugmalar), Numeric Controls (sonli qiymatlar) hamda Graphs va Charts (grafik ko'rsatkichlar).",
          },
          {
            en: "The Front Panel behaves like the panel of a real instrument and provides a convenient interface for the user.",
            ru: "Front Panel работает подобно панели реального прибора и обеспечивает удобный интерфейс для пользователя.",
            uz: "Front Panel oynasi real qurilma paneliga o'xshash tarzda ishlaydi va foydalanuvchi uchun qulay interfeys yaratadi.",
          },
        ],
      },
      {
        id: "env-s3",
        lessonId: "lesson-environment",
        order: 3,
        sectionTitle: {
          en: "The Block Diagram Window",
          ru: "Окно Block Diagram",
          uz: "Block Diagram oynasi",
        },
        paragraphs: [
          {
            en: "The Block Diagram is the main workspace that holds the program logic. Here functional blocks are connected to one another and the flow of data is organized. It contains the Functions Palette, structures, mathematical functions, data-flow elements, and wires (connecting lines).",
            ru: "Block Diagram — это основное рабочее пространство, где располагается логика программы. Здесь функциональные блоки соединяются друг с другом и организуется поток данных. Он содержит Functions Palette, структуры, математические функции, элементы потока данных и провода (соединительные линии).",
            uz: "Block Diagram — dastur logikasi joylashgan asosiy ishchi maydon. Bu yerda funksional bloklar o'zaro ulanadi va ma'lumot oqimi tashkil qilinadi. Tarkibida Functions Palette, Structures, Mathematical Functions, Data Flow elementlari va Wires (ulanish chiziqlari) mavjud.",
          },
          {
            en: "Instead of writing code, blocks are wired together. Each block performs a specific task and data is passed between them through wires.",
            ru: "Вместо написания кода блоки соединяются проводами. Каждый блок выполняет определённую задачу, а данные передаются между ними по проводам.",
            uz: "LabVIEW dasturida kod yozish o'rniga bloklar o'zaro bog'lanadi. Har bir blok ma'lum bir vazifani bajaradi va ma'lumotlar wire orqali uzatiladi.",
          },
        ],
      },
      {
        id: "env-s4",
        lessonId: "lesson-environment",
        order: 4,
        sectionTitle: {
          en: "Controls Palette and Functions Palette",
          ru: "Палитра Controls и палитра Functions",
          uz: "Controls Palette va Functions Palette",
        },
        paragraphs: [
          {
            en: "Special palettes are used to add elements. The Controls Palette adds elements to the Front Panel: buttons, sliders, numeric inputs, Boolean elements, and graphical indicators.",
            ru: "Для добавления элементов используются специальные палитры. Палитра Controls добавляет элементы на Front Panel: кнопки, ползунки, числовые поля, булевы элементы и графические индикаторы.",
            uz: "LabVIEW muhitida elementlarni qo'shish uchun maxsus palitralardan foydalaniladi. Controls Palette Front Panel uchun elementlar qo'shadi: tugmalar, sliderlar, numeric input, Boolean elementlar va grafik indikatorlar.",
          },
          {
            en: "The Functions Palette adds functions to the Block Diagram: arithmetic functions, logic operations, loops, structures, and signal-processing blocks. These palettes make building programs much faster and more convenient.",
            ru: "Палитра Functions добавляет функции на Block Diagram: арифметические функции, логические операции, циклы, структуры и блоки обработки сигналов. Эти палитры значительно ускоряют и упрощают создание программ.",
            uz: "Functions Palette Block Diagram uchun funksiyalar qo'shadi: arithmetic functions, logic operations, loops, structures va signal processing bloklari. Bu palitralar dastur yaratishni ancha tez va qulay qiladi.",
          },
        ],
      },
      {
        id: "env-s5",
        lessonId: "lesson-environment",
        order: 5,
        sectionTitle: {
          en: "The Data Flow Model",
          ru: "Модель потока данных (Data Flow)",
          uz: "Ma'lumot oqimi modeli (Data Flow)",
        },
        paragraphs: [
          {
            en: "LabVIEW's core operating principle is the Data Flow model: a block runs only once its input data is ready. This model enables parallel execution, fast performance, clear visual understanding, and the simplification of complex systems — one of LabVIEW's most important features.",
            ru: "Основной принцип работы LabVIEW — модель Data Flow: блок выполняется только тогда, когда его входные данные готовы. Эта модель обеспечивает параллельное выполнение, высокую скорость, наглядность и упрощение сложных систем — одна из важнейших особенностей LabVIEW.",
            uz: "LabVIEW dasturining asosiy ishlash prinsipi Data Flow modeliga asoslangan: dastur bloki ma'lumot tayyor bo'lgandagina ishlaydi. Bu model parallel ishlash imkoniyati, tez bajarilish, vizual tushunarlilik va murakkab tizimlarni soddalashtirish afzalliklarini beradi — bu LabVIEWning eng muhim xususiyatlaridan biridir.",
          },
        ],
      },
      {
        id: "env-s6",
        lessonId: "lesson-environment",
        order: 6,
        sectionTitle: {
          en: "Creating a Virtual Instrument (VI)",
          ru: "Создание виртуального прибора (VI)",
          uz: "Virtual Instrument (VI) yaratish",
        },
        paragraphs: [
          {
            en: "In LabVIEW every project is saved as a Virtual Instrument (VI). A VI consists of a Front Panel, a Block Diagram, and an Icon/Connector Pane.",
            ru: "В LabVIEW каждый проект сохраняется как виртуальный прибор (VI). VI состоит из Front Panel, Block Diagram и Icon/Connector Pane.",
            uz: "LabVIEWda har bir loyiha Virtual Instrument (VI) sifatida saqlanadi. VI Front Panel, Block Diagram va Icon/Connector Pane qismlaridan iborat.",
          },
          {
            en: "The process of creating a VI is: create a New VI, place elements on the Front Panel, wire blocks together on the Block Diagram, run the program, and check the results.",
            ru: "Процесс создания VI: создать New VI, разместить элементы на Front Panel, соединить блоки на Block Diagram, запустить программу и проверить результаты.",
            uz: "Virtual instrument yaratish jarayoni: New VI yaratish, Front Panelga elementlar joylashtirish, Block Diagramda bloklarni ulash, dasturni ishga tushirish va natijalarni tekshirish.",
          },
        ],
      },
      {
        id: "env-s7",
        lessonId: "lesson-environment",
        order: 7,
        sectionTitle: {
          en: "Running and Debugging the Program",
          ru: "Запуск и отладка программы",
          uz: "Dasturni ishga tushirish va debugging",
        },
        paragraphs: [
          {
            en: "Once a VI is built, it can be run using the Run button. LabVIEW's debugging tools include Highlight Execution, the Probe Tool, Breakpoints, and the Error List. These tools help find errors and observe how the program runs.",
            ru: "После создания VI его можно запустить кнопкой Run. Инструменты отладки LabVIEW включают Highlight Execution, Probe Tool, Breakpoints и Error List. Эти инструменты помогают находить ошибки и наблюдать за работой программы.",
            uz: "VI yaratib bo'lingandan so'ng uni Run tugmasi orqali ishga tushirish mumkin. Debugging vositalari: Highlight Execution, Probe Tool, Breakpoints va Error List. Bu vositalar xatolarni topish va dastur ishlashini kuzatishga yordam beradi.",
          },
        ],
      },
      {
        id: "env-s8",
        lessonId: "lesson-environment",
        order: 8,
        sectionTitle: {
          en: "Advantages of the LabVIEW Environment",
          ru: "Преимущества среды LabVIEW",
          uz: "LabVIEW muhitining afzalliklari",
        },
        paragraphs: [
          {
            en: "The LabVIEW environment provides convenient, interactive programming. Its main advantages are graphical programming, fast interface creation, working with hardware, visual debugging, engineering computation, and real-time monitoring. For these reasons LabVIEW is widely used in industry, laboratories, and scientific research.",
            ru: "Среда LabVIEW обеспечивает удобное интерактивное программирование. Её главные преимущества: графическое программирование, быстрое создание интерфейса, работа с оборудованием, визуальная отладка, инженерные расчёты и мониторинг в реальном времени. Поэтому LabVIEW широко применяется в промышленности, лабораториях и научных исследованиях.",
            uz: "LabVIEW muhiti foydalanuvchi uchun qulay va interaktiv dasturlash imkonini beradi. Asosiy afzalliklari: grafik dasturlash, tez interfeys yaratish, qurilmalar bilan ishlash, vizual debugging, muhandislik hisob-kitoblari va real vaqt monitoringi. Shu sababli LabVIEW sanoat, laboratoriya va ilmiy tadqiqotlarda keng qo'llaniladi.",
          },
        ],
      },
    ],
    visualizationExamples: [
      {
        id: "viz_dataflow_chain",
        lessonId: "lesson-environment",
        order: 1,
        complexity: "simple",
        title: {
          en: "Function pipeline: y = √(x² − k) · 2",
          ru: "Конвейер функций: y = √(x² − k) · 2",
          uz: "Funksiyalar quvuri: y = √(x² − k) · 2",
        },
        description: {
          en: "Data flows through Square, Subtract, Square-root and Multiply blocks in series — each block runs the moment its wire delivers a value.",
          ru: "Данные проходят через блоки квадрата, вычитания, квадратного корня и умножения — каждый блок выполняется, как только провод доставит значение.",
          uz: "Maʼlumot ketma-ket kvadrat, ayirish, kvadrat ildiz va koʻpaytirish bloklari orqali oqadi — har bir blok sim qiymatni yetkazishi bilan ishlaydi.",
        },
      },
    ],
  },

  // ─── Lesson 3: Virtual Instrument Creation Technology ─────────────────────
  {
    id: "lesson-vi-creation",
    title: {
      en: "Virtual Instrument Creation Technology",
      ru: "Технология создания виртуальных приборов",
      uz: "Virtual instrumentlarni yaratish texnologiyasi",
    },
    slug: "vi-creation",
    category: "subvi",
    difficulty: "beginner",
    durationMinutes: 45,
    thumbnailUrl: "",
    presentationUrl: "/assets/pdfs/vi-creation.pdf",
    order: 3,
    isPublished: true,
    createdAt: "2026-01-15",
    tags: [
      { en: "Virtual Instruments", ru: "Виртуальные приборы", uz: "Virtual instrumentlar" },
      { en: "SubVI", ru: "SubVI", uz: "SubVI" },
      { en: "Data Flow", ru: "Поток данных", uz: "Data Flow" },
    ],
    summaries: [
      {
        id: "vi-s1",
        lessonId: "lesson-vi-creation",
        order: 1,
        sectionTitle: {
          en: "Introduction to Virtual Instruments",
          ru: "Введение в виртуальные приборы",
          uz: "Virtual instrumentlarga kirish",
        },
        paragraphs: [
          {
            en: "In LabVIEW, programs are called Virtual Instruments (VI). A Virtual Instrument is a software-based representation of a real measuring or control instrument. It combines a graphical user interface with program logic to perform data acquisition, processing, analysis, and visualization.",
            ru: "В LabVIEW программы называются виртуальными приборами (VI). Виртуальный прибор — это программное представление реального измерительного или управляющего устройства. Он объединяет графический интерфейс с логикой программы для сбора, обработки, анализа и визуализации данных.",
            uz: "LabVIEWda dasturlar virtual instrumentlar (VI) deb ataladi. Virtual instrument — bu real o'lchov yoki boshqaruv qurilmasining dasturiy ko'rinishi. U grafik foydalanuvchi interfeysini dastur logikasi bilan birlashtirib, ma'lumotlarni yig'ish, qayta ishlash, tahlil qilish va vizuallashtirish vazifalarini bajaradi.",
          },
          {
            en: "Virtual Instruments are one of the most important concepts in LabVIEW because they let engineers and students create interactive technical applications without writing traditional text-based code.",
            ru: "Виртуальные приборы — одна из важнейших концепций LabVIEW, поскольку они позволяют инженерам и студентам создавать интерактивные технические приложения без написания традиционного текстового кода.",
            uz: "Virtual instrumentlar LabVIEWning eng muhim tushunchalaridan biri, chunki ular muhandis va talabalarga an'anaviy matnli kod yozmasdan interaktiv texnik ilovalar yaratish imkonini beradi.",
          },
        ],
      },
      {
        id: "vi-s2",
        lessonId: "lesson-vi-creation",
        order: 2,
        sectionTitle: {
          en: "Structure of a Virtual Instrument",
          ru: "Структура виртуального прибора",
          uz: "Virtual instrument tuzilishi",
        },
        paragraphs: [
          {
            en: "Every VI consists of three main components. The Front Panel is the user interface, containing controls and indicators such as buttons, numeric controls, graphs, charts, LEDs, and switches — simulating the appearance of a real instrument panel.",
            ru: "Каждый VI состоит из трёх основных компонентов. Front Panel — это пользовательский интерфейс с элементами управления и индикаторами: кнопками, числовыми полями, графиками, диаграммами, светодиодами и переключателями, имитирующими панель реального прибора.",
            uz: "Har bir VI uchta asosiy qismdan iborat. Front Panel — foydalanuvchi interfeysi bo'lib, unda boshqaruv elementlari va indikatorlar joylashadi: tugmalar, numeric controls, grafiklar, chartlar, LEDlar va switchlar — real qurilma panelini taqlid qiladi.",
          },
          {
            en: "The Block Diagram contains the graphical source code, where program logic is built from functional blocks connected by wires (functions, structures, math operations, data-processing blocks, loops, and conditions). Data moves between blocks via wires following the Data Flow model. Each VI also has an Icon and Connector Pane: the Icon represents the VI visually, and the Connector Pane lets it be used as a subVI inside other programs, supporting modular, reusable code.",
            ru: "Block Diagram содержит графический исходный код, где логика программы строится из функциональных блоков, соединённых проводами (функции, структуры, математические операции, блоки обработки данных, циклы и условия). Данные перемещаются между блоками по проводам согласно модели Data Flow. Каждый VI также имеет Icon и Connector Pane: Icon визуально представляет VI, а Connector Pane позволяет использовать его как subVI внутри других программ, поддерживая модульный и переиспользуемый код.",
            uz: "Block Diagram grafik manba kodini saqlaydi: dastur logikasi wirelar bilan ulangan funksional bloklardan quriladi (functions, structures, matematik amallar, ma'lumotni qayta ishlash bloklari, loops va conditions). Ma'lumot bloklar orasida Data Flow modeli bo'yicha wire orqali uzatiladi. Har bir VIda Icon va Connector Pane ham bo'ladi: Icon VIni vizual ifodalaydi, Connector Pane esa uni boshqa dasturlar ichida subVI sifatida ishlatish imkonini beradi va modulli, qayta ishlatiladigan kodni qo'llab-quvvatlaydi.",
          },
        ],
      },
      {
        id: "vi-s3",
        lessonId: "lesson-vi-creation",
        order: 3,
        sectionTitle: {
          en: "Creating a Virtual Instrument",
          ru: "Создание виртуального прибора",
          uz: "Virtual instrument yaratish",
        },
        paragraphs: [
          {
            en: "Creating a VI involves several stages. Step 1: create a new VI through the File menu or startup window. Step 2: design the Front Panel by adding controls and indicators from the Controls Palette (numeric inputs, Boolean buttons, graph indicators, sliders, switches) — the interface should be simple, organized, and user-friendly.",
            ru: "Создание VI включает несколько этапов. Шаг 1: создать новый VI через меню File или стартовое окно. Шаг 2: спроектировать Front Panel, добавив элементы управления и индикаторы из палитры Controls (числовые поля, булевы кнопки, графические индикаторы, ползунки, переключатели) — интерфейс должен быть простым, организованным и удобным.",
            uz: "VI yaratish bir necha bosqichdan iborat. 1-bosqich: File menyusi yoki startup oynasi orqali yangi VI yaratish. 2-bosqich: Controls Palette dan boshqaruv elementlari va indikatorlarni qo'shib Front Panelni loyihalash (numeric input, Boolean tugmalar, grafik indikatorlar, sliderlar, switchlar) — interfeys sodda, tartibli va qulay bo'lishi kerak.",
          },
          {
            en: "Step 3: build the Block Diagram by adding functions from the Functions Palette, connecting blocks with wires, creating calculations and logic, and organizing execution flow. Step 4: run and test the VI with the Run button, checking functionality, data flow, output accuracy, and errors. Debugging tools help identify and fix problems.",
            ru: "Шаг 3: построить Block Diagram, добавив функции из палитры Functions, соединив блоки проводами, создав вычисления и логику и организовав поток выполнения. Шаг 4: запустить и протестировать VI кнопкой Run, проверяя работоспособность, поток данных, точность вывода и ошибки. Инструменты отладки помогают находить и устранять проблемы.",
            uz: "3-bosqich: Functions Palette dan funksiyalar qo'shib, bloklarni wire bilan ulab, hisob-kitob va mantiqiy amallar yaratib, bajarilish oqimini tashkil qilib Block Diagramni qurish. 4-bosqich: Run tugmasi bilan VIni ishga tushirish va sinash — funksionallik, ma'lumot oqimi, natija aniqligi va xatolarni tekshirish. Debugging vositalari muammolarni aniqlash va tuzatishga yordam beradi.",
          },
        ],
      },
      {
        id: "vi-s4",
        lessonId: "lesson-vi-creation",
        order: 4,
        sectionTitle: {
          en: "SubVI Technology",
          ru: "Технология SubVI",
          uz: "SubVI texnologiyasi",
        },
        paragraphs: [
          {
            en: "LabVIEW lets developers create reusable VIs called subVIs, which work much like functions in traditional programming languages. Their advantages include code reusability, a simplified project structure, easier debugging, better scalability, and faster development. Large applications are usually built from many interconnected subVIs.",
            ru: "LabVIEW позволяет создавать переиспользуемые VI, называемые subVI, которые работают подобно функциям в традиционных языках программирования. Их преимущества: переиспользование кода, упрощённая структура проекта, более лёгкая отладка, лучшая масштабируемость и ускоренная разработка. Крупные приложения обычно строятся из множества взаимосвязанных subVI.",
            uz: "LabVIEW qayta ishlatiladigan VIlar — subVIlar yaratish imkonini beradi, ular an'anaviy dasturlash tillaridagi funksiyalarga o'xshaydi. Afzalliklari: kodni qayta ishlatish, loyiha tuzilishini soddalashtirish, osonroq debugging, yaxshiroq miqyoslanish va tezroq ishlab chiqish. Yirik ilovalar odatda ko'plab o'zaro bog'langan subVIlardan quriladi.",
          },
        ],
      },
      {
        id: "vi-s5",
        lessonId: "lesson-vi-creation",
        order: 5,
        sectionTitle: {
          en: "Data Flow in Virtual Instruments",
          ru: "Поток данных в виртуальных приборах",
          uz: "Virtual instrumentlarda ma'lumot oqimi",
        },
        paragraphs: [
          {
            en: "LabVIEW uses a Data Flow execution model: a block executes only when all of its required input data is available. This makes execution visual and efficient. The benefits of Data Flow include parallel execution, faster processing, easy visualization, and simplified debugging — it is one of the key features of LabVIEW programming.",
            ru: "LabVIEW использует модель выполнения Data Flow: блок выполняется только тогда, когда доступны все необходимые входные данные. Это делает выполнение наглядным и эффективным. Преимущества Data Flow: параллельное выполнение, более быстрая обработка, простая визуализация и упрощённая отладка — одна из ключевых особенностей программирования в LabVIEW.",
            uz: "LabVIEW Data Flow bajarilish modelidan foydalanadi: blok faqat barcha zarur kirish ma'lumotlari mavjud bo'lgandagina ishga tushadi. Bu bajarilishni vizual va samarali qiladi. Data Flow afzalliklari: parallel bajarilish, tezroq qayta ishlash, oson vizuallashtirish va soddalashtirilgan debugging — bu LabVIEW dasturlashining asosiy xususiyatlaridan biridir.",
          },
        ],
      },
      {
        id: "vi-s6",
        lessonId: "lesson-vi-creation",
        order: 6,
        sectionTitle: {
          en: "Error Handling in Virtual Instruments",
          ru: "Обработка ошибок в виртуальных приборах",
          uz: "Virtual instrumentlarda xatolarni boshqarish",
        },
        paragraphs: [
          {
            en: "Error handling is essential for building stable applications. LabVIEW provides error clusters, error indicators, debugging tools, and execution highlighting. Proper error handling improves reliability and prevents unexpected behavior.",
            ru: "Обработка ошибок необходима для создания стабильных приложений. LabVIEW предоставляет кластеры ошибок, индикаторы ошибок, инструменты отладки и подсветку выполнения. Правильная обработка ошибок повышает надёжность и предотвращает непредвиденное поведение.",
            uz: "Xatolarni boshqarish barqaror ilovalar yaratish uchun muhim. LabVIEW error clusterlar, error indikatorlar, debugging vositalari va execution highlighting imkoniyatlarini taqdim etadi. To'g'ri xatolarni boshqarish ishonchlilikni oshiradi va kutilmagan xatti-harakatlarning oldini oladi.",
          },
        ],
      },
      {
        id: "vi-s7",
        lessonId: "lesson-vi-creation",
        order: 7,
        sectionTitle: {
          en: "Applications of Virtual Instruments",
          ru: "Применение виртуальных приборов",
          uz: "Virtual instrumentlarning qo'llanilishi",
        },
        paragraphs: [
          {
            en: "Virtual Instruments are widely used in industrial automation, laboratory measurements, sensor systems, robotics, data acquisition, signal processing, and scientific research. They help engineers build flexible and powerful technical systems.",
            ru: "Виртуальные приборы широко применяются в промышленной автоматике, лабораторных измерениях, сенсорных системах, робототехнике, сборе данных, обработке сигналов и научных исследованиях. Они помогают инженерам создавать гибкие и мощные технические системы.",
            uz: "Virtual instrumentlar sanoat avtomatikasi, laboratoriya o'lchovlari, sensor tizimlari, robototexnika, ma'lumot yig'ish, signalni qayta ishlash va ilmiy tadqiqotlarda keng qo'llaniladi. Ular muhandislarga moslashuvchan va kuchli texnik tizimlar yaratishga yordam beradi.",
          },
        ],
      },
      {
        id: "vi-s8",
        lessonId: "lesson-vi-creation",
        order: 8,
        sectionTitle: {
          en: "Advantages of Virtual Instrument Technology",
          ru: "Преимущества технологии виртуальных приборов",
          uz: "Virtual instrument texnologiyasining afzalliklari",
        },
        paragraphs: [
          {
            en: "Virtual Instrument technology offers many advantages over traditional programming: a visual programming environment, rapid application development, interactive user interfaces, hardware integration, real-time monitoring, and simplified maintenance. Because of these features, LabVIEW is widely used in engineering and technical education.",
            ru: "Технология виртуальных приборов даёт множество преимуществ перед традиционным программированием: визуальная среда программирования, быстрая разработка приложений, интерактивные интерфейсы, интеграция с оборудованием, мониторинг в реальном времени и упрощённое сопровождение. Благодаря этим возможностям LabVIEW широко применяется в инженерии и техническом образовании.",
            uz: "Virtual instrument texnologiyasi an'anaviy dasturlashga nisbatan ko'plab afzalliklar beradi: vizual dasturlash muhiti, tez ilova ishlab chiqish, interaktiv foydalanuvchi interfeyslari, qurilmalar bilan integratsiya, real vaqt monitoringi va soddalashtirilgan texnik xizmat. Shu xususiyatlari tufayli LabVIEW muhandislik va texnik ta'limda keng qo'llaniladi.",
          },
        ],
      },
    ],
    visualizationExamples: [
      {
        id: "viz_subvi_call",
        lessonId: "lesson-vi-creation",
        order: 1,
        complexity: "advanced",
        title: {
          en: "Branching dataflow: out = √(a² − b²)",
          ru: "Ветвящийся поток: out = √(a² − b²)",
          uz: "Tarmoqlanuvchi oqim: out = √(a² − b²)",
        },
        description: {
          en: "Two inputs are squared in parallel by reusable blocks, subtracted, then passed through a square root — independent branches run concurrently under Data Flow.",
          ru: "Два входа возводятся в квадрат параллельно переиспользуемыми блоками, вычитаются, затем проходят через квадратный корень — независимые ветви выполняются одновременно по модели Data Flow.",
          uz: "Ikki kirish qayta ishlatiladigan bloklar tomonidan parallel kvadratga koʻtariladi, ayiriladi, soʻng kvadrat ildizdan oʻtkaziladi — mustaqil tarmoqlar Data Flow boʻyicha bir vaqtda ishlaydi.",
        },
      },
    ],
  },

  // ─── Lesson 4: Program Debugging Methods in LabVIEW ───────────────────────
  {
    id: "lesson-debugging",
    title: {
      en: "Program Debugging Methods in LabVIEW",
      ru: "Методы отладки программ в LabVIEW",
      uz: "LabVIEWda dasturlarni sozlash usullari",
    },
    slug: "debugging",
    category: "debugging",
    difficulty: "intermediate",
    durationMinutes: 45,
    thumbnailUrl: "",
    presentationUrl: "/assets/pdfs/debugging.pdf",
    order: 4,
    isPublished: true,
    createdAt: "2026-01-18",
    tags: [
      { en: "Debugging", ru: "Отладка", uz: "Sozlash" },
      { en: "Probe Tool", ru: "Probe Tool", uz: "Probe Tool" },
      { en: "Error Handling", ru: "Обработка ошибок", uz: "Xatolarni boshqarish" },
    ],
    summaries: [
      {
        id: "dbg-s1", lessonId: "lesson-debugging", order: 1,
        sectionTitle: { en: "What is Debugging?", ru: "Что такое отладка?", uz: "Sozlash nima?" },
        paragraphs: [
          {
            en: "Debugging is the process of identifying, analyzing, and correcting errors in a program. While developing Virtual Instruments, logical, syntactic, or execution errors may occur that cause wrong results or prevent the VI from running. LabVIEW provides built-in debugging tools that help developers understand program behaviour, locate errors, and improve reliability.",
            ru: "Отладка — это процесс выявления, анализа и исправления ошибок в программе. При разработке виртуальных приборов могут возникать логические, синтаксические или исполнительные ошибки, приводящие к неверным результатам или мешающие запуску VI. LabVIEW предоставляет встроенные инструменты отладки, помогающие понять поведение программы, найти ошибки и повысить надёжность.",
            uz: "Sozlash (debugging) — dasturdagi xatolarni aniqlash, tahlil qilish va tuzatish jarayoni. Virtual instrumentlarni ishlab chiqishda mantiqiy, sintaktik yoki bajarilish xatolari yuzaga kelishi mumkin, ular noto'g'ri natija beradi yoki VIni ishga tushirishga to'sqinlik qiladi. LabVIEW dastur xatti-harakatini tushunish, xatolarni topish va ishonchlilikni oshirishga yordam beruvchi ichki sozlash vositalarini taqdim etadi.",
          },
        ],
      },
      {
        id: "dbg-s2", lessonId: "lesson-debugging", order: 2,
        sectionTitle: { en: "Types of Errors", ru: "Типы ошибок", uz: "Xatolar turlari" },
        paragraphs: [
          {
            en: "Errors in LabVIEW fall into three categories. Syntax errors happen when blocks are wired incorrectly or required inputs are missing — they stop the VI from running and show a broken Run button. Run-time errors occur during execution (invalid file paths, hardware communication failures, wrong data formats). Logical errors run successfully but produce incorrect results due to flaws in the algorithm.",
            ru: "Ошибки в LabVIEW делятся на три категории. Синтаксические возникают при неверном соединении блоков или отсутствии нужных входов — они не дают VI запуститься и показывают «сломанную» кнопку Run. Ошибки времени выполнения происходят во время работы (неверные пути к файлам, сбои связи с оборудованием, неправильные форматы данных). Логические выполняются успешно, но дают неверный результат из-за изъянов алгоритма.",
            uz: "LabVIEWdagi xatolar uch turga bo'linadi. Sintaktik xatolar bloklar noto'g'ri ulanganda yoki zarur kirishlar yetishmaganda yuzaga keladi — ular VIni ishga tushirmaydi va «singan» Run tugmasini ko'rsatadi. Bajarilish (run-time) xatolari dastur ishlayotganda yuzaga keladi (noto'g'ri fayl yo'llari, qurilma bilan aloqa uzilishi, noto'g'ri ma'lumot formatlari). Mantiqiy xatolar muvaffaqiyatli bajariladi, lekin algoritmdagi nuqsonlar tufayli noto'g'ri natija beradi.",
          },
        ],
      },
      {
        id: "dbg-s3", lessonId: "lesson-debugging", order: 3,
        sectionTitle: { en: "Highlight Execution & Probe Tool", ru: "Highlight Execution и Probe Tool", uz: "Highlight Execution va Probe Tool" },
        paragraphs: [
          {
            en: "Highlight Execution runs the program slowly and visually shows data moving through wires and blocks, so you can watch the order of operations and how data flows — invaluable when learning LabVIEW. The Probe Tool lets you attach a probe to any wire to inspect its data values in real time, which is ideal for verifying calculations and tracking complex signal processing.",
            ru: "Highlight Execution выполняет программу медленно и визуально показывает движение данных по проводам и блокам, позволяя наблюдать порядок операций и поток данных — это бесценно при изучении LabVIEW. Probe Tool позволяет подключить пробник к любому проводу и просматривать его значения в реальном времени, что идеально для проверки вычислений и отслеживания сложной обработки сигналов.",
            uz: "Highlight Execution dasturni sekin bajaradi va ma'lumotlarning simlar hamda bloklar orqali harakatini vizual ko'rsatadi, shu bois amallar tartibini va ma'lumot oqimini kuzatish mumkin — bu LabVIEWni o'rganishda bebaho. Probe Tool istalgan simga probe ulab, uning qiymatlarini real vaqtda ko'rish imkonini beradi, bu hisob-kitoblarni tekshirish va murakkab signal qayta ishlashni kuzatish uchun juda qulay.",
          },
        ],
      },
      {
        id: "dbg-s4", lessonId: "lesson-debugging", order: 4,
        sectionTitle: { en: "Breakpoints & Single-Stepping", ru: "Точки останова и пошаговое выполнение", uz: "Breakpointlar va qadamli bajarilish" },
        paragraphs: [
          {
            en: "Breakpoints temporarily pause execution at a chosen location so you can examine the VI's current state before continuing — great for isolating problem areas in large projects. Single-stepping (Step Into, Step Over, Step Out) executes the program one operation at a time, giving detailed control and making the behaviour of loops, structures, and subVIs easy to follow.",
            ru: "Точки останова временно приостанавливают выполнение в выбранном месте, чтобы изучить текущее состояние VI перед продолжением — удобно для локализации проблемных мест в больших проектах. Пошаговое выполнение (Step Into, Step Over, Step Out) выполняет программу по одной операции, давая детальный контроль и облегчая понимание поведения циклов, структур и subVI.",
            uz: "Breakpointlar bajarilishni tanlangan joyda vaqtincha to'xtatadi, shunda davom etishdan oldin VIning joriy holatini ko'rish mumkin — yirik loyihalarda muammoli joylarni ajratishda qulay. Qadamli bajarilish (Step Into, Step Over, Step Out) dasturni bir vaqtda bitta amaldan bajaradi, batafsil nazorat beradi va sikllar, strukturalar hamda subVIlar xatti-harakatini kuzatishni osonlashtiradi.",
          },
        ],
      },
      {
        id: "dbg-s5", lessonId: "lesson-debugging", order: 5,
        sectionTitle: { en: "Error Clusters & the Error List", ru: "Кластеры ошибок и список ошибок", uz: "Error clusterlar va xatolar ro'yxati" },
        paragraphs: [
          {
            en: "LabVIEW uses Error Clusters to pass error information between functions; a cluster carries an error status, an error code, and a source description. Wiring clusters through the application lets you track and respond to errors, improving reliability and giving meaningful messages. The Error List Window lists all detected errors and warnings — broken wires, missing inputs, invalid configurations — and selecting one highlights the problem on the Block Diagram.",
            ru: "LabVIEW использует кластеры ошибок для передачи информации об ошибках между функциями; кластер содержит статус ошибки, код ошибки и описание источника. Проводя кластеры через приложение, можно отслеживать ошибки и реагировать на них, повышая надёжность и давая осмысленные сообщения. Окно Error List перечисляет все обнаруженные ошибки и предупреждения — оборванные провода, отсутствующие входы, неверные конфигурации — и выбор ошибки подсвечивает проблему на блок-диаграмме.",
            uz: "LabVIEW funksiyalar o'rtasida xato ma'lumotini uzatish uchun error clusterlardan foydalanadi; cluster xato holati, xato kodi va manba tavsifini saqlaydi. Clusterlarni ilova bo'ylab ulab, xatolarni kuzatish va ularga javob berish mumkin, bu ishonchlilikni oshiradi va mazmunli xabarlar beradi. Error List oynasi aniqlangan barcha xato va ogohlantirishlarni — singan simlar, yetishmayotgan kirishlar, noto'g'ri sozlamalarni — ko'rsatadi va xatoni tanlash Block Diagramdagi muammoni yoritadi.",
          },
        ],
      },
      {
        id: "dbg-s6", lessonId: "lesson-debugging", order: 6,
        sectionTitle: { en: "Debugging SubVIs & Best Practices", ru: "Отладка subVI и лучшие практики", uz: "SubVIlarni sozlash va eng yaxshi amaliyotlar" },
        paragraphs: [
          {
            en: "When debugging subVIs, verify input/output connections, test each subVI independently, place probes inside them, and monitor error clusters. Good general practice: test small sections frequently, use meaningful labels and documentation, apply consistent error handling, validate inputs before processing, and use probes and breakpoints strategically. In engineering systems, where software errors can cause failures, disciplined debugging keeps applications accurate and reliable.",
            ru: "При отладке subVI проверяйте соединения входов/выходов, тестируйте каждый subVI отдельно, ставьте внутри пробники и следите за кластерами ошибок. Хорошая практика: часто тестировать небольшие части, использовать понятные подписи и документацию, применять единообразную обработку ошибок, проверять входы до обработки и стратегически использовать пробники и точки останова. В инженерных системах, где ошибки ПО могут привести к сбоям, дисциплинированная отладка обеспечивает точность и надёжность.",
            uz: "SubVIlarni sozlashda kirish/chiqish ulanishlarini tekshiring, har bir subVIni alohida sinang, ularning ichiga probelar qo'ying va error clusterlarni kuzating. Yaxshi amaliyot: kichik qismlarni tez-tez sinash, mazmunli yorliq va hujjatlardan foydalanish, izchil xato boshqaruvini qo'llash, qayta ishlashdan oldin kirishlarni tekshirish hamda probe va breakpointlardan strategik foydalanish. Dasturiy xatolar nosozliklarga olib kelishi mumkin bo'lgan muhandislik tizimlarida intizomli sozlash ilovalarni aniq va ishonchli saqlaydi.",
          },
        ],
      },
    ],
    visualizationExamples: [
      {
        id: "viz_highlight_exec",
        lessonId: "lesson-debugging",
        order: 1,
        complexity: "simple",
        title: { en: "Highlight Execution & Probe", ru: "Highlight Execution и Probe", uz: "Highlight Execution va Probe" },
        description: {
          en: "Watch data crawl along the wire, pause to probe the value mid-stream, then pass it to the output — exactly how LabVIEW's debugging tools work.",
          ru: "Посмотрите, как данные медленно движутся по проводу, остановитесь для «зондирования» значения, затем передайте его на выход — именно так работают инструменты отладки LabVIEW.",
          uz: "Ma'lumotning sim bo'ylab sekin sudralishini kuzating, oqim o'rtasida qiymatni probe bilan tekshiring, so'ng chiqishga uzating — LabVIEW sozlash vositalari aynan shunday ishlaydi.",
        },
      },
      {
        id: "viz_error_cluster",
        lessonId: "lesson-debugging",
        order: 2,
        complexity: "advanced",
        title: { en: "Error Cluster Propagation", ru: "Распространение кластера ошибок", uz: "Error cluster tarqalishi" },
        description: {
          en: "An error raised in one function travels through the error cluster — downstream functions skip their work and the handler reports the code and source.",
          ru: "Ошибка, возникшая в одной функции, распространяется через кластер ошибок — последующие функции пропускают работу, а обработчик сообщает код и источник.",
          uz: "Bitta funksiyada yuzaga kelgan xato error cluster orqali tarqaladi — keyingi funksiyalar ishini o'tkazib yuboradi, ishlovchi esa kod va manbani bildiradi.",
        },
      },
      {
        id: "viz_breakpoint_step",
        lessonId: "lesson-debugging",
        order: 3,
        complexity: "advanced",
        title: { en: "Breakpoints & Single-Stepping", ru: "Точки останова и пошаговое выполнение", uz: "Breakpointlar va qadamli bajarilish" },
        description: {
          en: "A breakpoint pauses the VI mid-execution; single-stepping then advances one node at a time while a probe shows the running value.",
          ru: "Точка останова приостанавливает VI во время выполнения; пошаговый режим продвигается по одному узлу, а пробник показывает текущее значение.",
          uz: "Breakpoint VIni bajarilish o'rtasida to'xtatadi; qadamli rejim har safar bitta tugunni oldinga suradi, probe esa joriy qiymatni ko'rsatadi.",
        },
      },
    ],
  },

  // ─── Lesson 5: Iterative Processes in VI Development ──────────────────────
  {
    id: "lesson-loops",
    title: {
      en: "Iterative Processes in VI Development",
      ru: "Итеративные процессы в разработке VI",
      uz: "VI ishlab chiqishda iterativ jarayonlar",
    },
    slug: "iterative-processes",
    category: "loops",
    difficulty: "beginner",
    durationMinutes: 40,
    thumbnailUrl: "",
    presentationUrl: "/assets/pdfs/iterative-processes.pdf",
    order: 5,
    isPublished: true,
    createdAt: "2026-01-20",
    tags: [
      { en: "While Loop", ru: "While Loop", uz: "While Loop" },
      { en: "For Loop", ru: "For Loop", uz: "For Loop" },
      { en: "Shift Registers", ru: "Сдвиговые регистры", uz: "Shift registerlar" },
    ],
    summaries: [
      {
        id: "lp-s1", lessonId: "lesson-loops", order: 1,
        sectionTitle: { en: "Why Iterative Processes Matter", ru: "Зачем нужны итеративные процессы", uz: "Iterativ jarayonlar nega muhim" },
        paragraphs: [
          {
            en: "Many engineering and measurement tasks require operations to run repeatedly. In LabVIEW this is achieved with loop structures, which run a block of code multiple times until a condition is met or a set number of iterations completes. Iterative processes enable continuous monitoring, data acquisition, signal processing, automation, and real-time control.",
            ru: "Многие инженерные и измерительные задачи требуют повторного выполнения операций. В LabVIEW это достигается с помощью структур циклов, которые выполняют блок кода многократно, пока не выполнится условие или не завершится заданное число итераций. Итеративные процессы обеспечивают непрерывный мониторинг, сбор данных, обработку сигналов, автоматизацию и управление в реальном времени.",
            uz: "Ko'plab muhandislik va o'lchov vazifalari amallarni takror bajarishni talab qiladi. LabVIEWda bu sikl strukturalari yordamida amalga oshiriladi: ular kod blokini shart bajarilguncha yoki belgilangan iteratsiyalar soni tugaguncha bir necha marta bajaradi. Iterativ jarayonlar uzluksiz monitoring, ma'lumot yig'ish, signal qayta ishlash, avtomatlashtirish va real vaqt boshqaruvini ta'minlaydi.",
          },
        ],
      },
      {
        id: "lp-s2", lessonId: "lesson-loops", order: 2,
        sectionTitle: { en: "The While Loop", ru: "Цикл While", uz: "While sikli" },
        paragraphs: [
          {
            en: "The While Loop runs repeatedly until a stop condition becomes true, checking that condition at the end of each iteration. It executes an unknown number of times, suits continuous monitoring and real-time applications, and always needs a stop condition to avoid running forever. Typical uses: monitoring sensor values, user-controlled apps, data logging, and continuous measurements.",
            ru: "Цикл While выполняется, пока условие остановки не станет истинным, проверяя его в конце каждой итерации. Он выполняется неизвестное число раз, подходит для непрерывного мониторинга и приложений реального времени и всегда требует условия остановки, чтобы не работать бесконечно. Типичное применение: мониторинг датчиков, приложения под управлением пользователя, регистрация данных и непрерывные измерения.",
            uz: "While sikli to'xtash sharti rost bo'lguncha takror ishlaydi va bu shartni har iteratsiya oxirida tekshiradi. U noma'lum marta bajariladi, uzluksiz monitoring va real vaqt ilovalariga mos keladi hamda cheksiz ishlamasligi uchun doim to'xtash shartini talab qiladi. Odatiy qo'llanilishi: sensor qiymatlarini kuzatish, foydalanuvchi boshqaradigan ilovalar, ma'lumot qayd etish va uzluksiz o'lchovlar.",
          },
        ],
      },
      {
        id: "lp-s3", lessonId: "lesson-loops", order: 3,
        sectionTitle: { en: "The For Loop", ru: "Цикл For", uz: "For sikli" },
        paragraphs: [
          {
            en: "The For Loop executes a fixed number of iterations decided before it starts, then stops automatically. Unlike the While Loop, the repetition count is known in advance, which gives predictable behaviour. It is ideal for repetitive calculations and array processing — mathematical computations, processing data arrays, repeated testing, and statistical analysis.",
            ru: "Цикл For выполняет фиксированное число итераций, заданное до запуска, и затем останавливается автоматически. В отличие от While, число повторений известно заранее, что даёт предсказуемое поведение. Он идеален для повторяющихся вычислений и обработки массивов — математические расчёты, обработка массивов данных, повторное тестирование и статистический анализ.",
            uz: "For sikli boshlanishidan oldin belgilangan aniq sondagi iteratsiyalarni bajaradi va so'ng avtomatik to'xtaydi. While siklidan farqli ravishda takrorlanishlar soni oldindan ma'lum bo'lib, bu oldindan aytib bo'ladigan xatti-harakat beradi. U takrorlanuvchi hisob-kitoblar va massivlarni qayta ishlash uchun ideal — matematik hisoblar, ma'lumot massivlarini qayta ishlash, takroriy sinov va statistik tahlil.",
          },
        ],
      },
      {
        id: "lp-s4", lessonId: "lesson-loops", order: 4,
        sectionTitle: { en: "Loop Components", ru: "Компоненты цикла", uz: "Sikl komponentlari" },
        paragraphs: [
          {
            en: "Each loop has key elements. The iteration terminal stores the current iteration number and is used for counting repetitions, indexing arrays, and tracking progress. The conditional terminal decides when a loop should stop and is typically wired to Boolean controls, comparison functions, or error conditions. Together they give flexible control over loop execution.",
            ru: "У каждого цикла есть ключевые элементы. Терминал итераций хранит номер текущей итерации и используется для подсчёта повторений, индексации массивов и отслеживания прогресса. Условный терминал определяет, когда цикл должен остановиться, и обычно подключается к булевым элементам, функциям сравнения или условиям ошибок. Вместе они дают гибкий контроль над выполнением цикла.",
            uz: "Har bir siklda muhim elementlar bor. Iteratsiya terminali joriy iteratsiya raqamini saqlaydi va takrorlanishlarni sanash, massivlarni indekslash hamda jarayonni kuzatish uchun ishlatiladi. Shartli terminal siklning qachon to'xtashini belgilaydi va odatda Boolean elementlar, taqqoslash funksiyalari yoki xato shartlariga ulanadi. Birgalikda ular sikl bajarilishini moslashuvchan boshqaradi.",
          },
        ],
      },
      {
        id: "lp-s5", lessonId: "lesson-loops", order: 5,
        sectionTitle: { en: "Shift Registers & Auto-Indexing", ru: "Сдвиговые регистры и авто-индексация", uz: "Shift registerlar va avto-indekslash" },
        paragraphs: [
          {
            en: "Shift Registers carry data from one iteration to the next, storing values between cycles — essential for running totals, averages, data accumulation, and state tracking. Auto-Indexing automatically processes one array element per iteration when an array is wired to a loop, simplifying array processing, reducing complexity, and improving readability.",
            ru: "Сдвиговые регистры передают данные из одной итерации в следующую, сохраняя значения между циклами — это необходимо для накопительных сумм, средних значений, накопления данных и отслеживания состояния. Авто-индексация автоматически обрабатывает один элемент массива за итерацию, когда массив подключён к циклу, упрощая обработку массивов, снижая сложность и улучшая читаемость.",
            uz: "Shift registerlar ma'lumotni bir iteratsiyadan keyingisiga uzatib, qiymatlarni sikllar orasida saqlaydi — bu joriy yig'indilar, o'rtachalar, ma'lumot to'plash va holatni kuzatish uchun zarur. Avto-indekslash massiv siklga ulanganda har iteratsiyada bitta massiv elementini avtomatik qayta ishlaydi, bu massivlarni qayta ishlashni soddalashtiradi, murakkablikni kamaytiradi va o'qishni yaxshilaydi.",
          },
        ],
      },
      {
        id: "lp-s6", lessonId: "lesson-loops", order: 6,
        sectionTitle: { en: "Timing, Nesting & Best Practices", ru: "Тайминг, вложенность и лучшие практики", uz: "Vaqt, ichma-ichlik va eng yaxshi amaliyotlar" },
        paragraphs: [
          {
            en: "Timing functions (Wait (ms), Wait Until Next ms Multiple, Elapsed Time) control execution speed, reduce CPU usage, and synchronise operations. Nested loops handle multi-level tasks like matrix calculations but add complexity if overused. Best practices: always define a proper stop condition, use timing when needed, avoid unnecessary nesting, monitor memory, use shift registers effectively, and add error handling inside loops.",
            ru: "Функции тайминга (Wait (ms), Wait Until Next ms Multiple, Elapsed Time) управляют скоростью выполнения, снижают нагрузку на процессор и синхронизируют операции. Вложенные циклы решают многоуровневые задачи, например матричные вычисления, но усложняют программу при чрезмерном использовании. Лучшие практики: всегда задавать корректное условие остановки, использовать тайминг при необходимости, избегать лишней вложенности, следить за памятью, эффективно применять сдвиговые регистры и добавлять обработку ошибок внутри циклов.",
            uz: "Vaqt funksiyalari (Wait (ms), Wait Until Next ms Multiple, Elapsed Time) bajarilish tezligini boshqaradi, protsessor yukini kamaytiradi va amallarni sinxronlaydi. Ichma-ich sikllar matritsa hisoblari kabi ko'p bosqichli vazifalarni bajaradi, lekin haddan tashqari ishlatilsa murakkablikni oshiradi. Eng yaxshi amaliyotlar: doim to'g'ri to'xtash shartini belgilash, kerak bo'lganda vaqtdan foydalanish, ortiqcha ichma-ichlikdan qochish, xotirani kuzatish, shift registerlardan samarali foydalanish va sikllar ichida xato boshqaruvini qo'shish.",
          },
        ],
      },
    ],
    visualizationExamples: [
      {
        id: "viz_for_loop_count",
        lessonId: "lesson-loops",
        order: 1,
        complexity: "simple",
        title: { en: "For Loop: counting iterations", ru: "Цикл For: подсчёт итераций", uz: "For sikli: iteratsiyalarni sanash" },
        description: {
          en: "The iteration terminal i counts 0, 1, 2, 3 inside the loop boundary, then the For Loop finishes and reports the count.",
          ru: "Терминал итераций i считает 0, 1, 2, 3 внутри границы цикла, затем цикл For завершается и сообщает число итераций.",
          uz: "Iteratsiya terminali i sikl chegarasi ichida 0, 1, 2, 3 ni sanaydi, so'ng For sikli tugaydi va sanoqni bildiradi.",
        },
      },
      {
        id: "viz_while_loop",
        lessonId: "lesson-loops",
        order: 2,
        complexity: "advanced",
        title: { en: "While Loop: stop on a condition", ru: "Цикл While: остановка по условию", uz: "While sikli: shart bo'yicha to'xtash" },
        description: {
          en: "Each iteration reads a value and compares it to a limit; the conditional terminal keeps the loop running until the stop condition becomes true.",
          ru: "Каждая итерация читает значение и сравнивает его с пределом; условный терминал поддерживает работу цикла, пока условие остановки не станет истинным.",
          uz: "Har iteratsiya qiymatni o'qiydi va uni chegara bilan solishtiradi; shartli terminal to'xtash sharti rost bo'lguncha siklni ishlatib turadi.",
        },
      },
      {
        id: "viz_for_loop_sum",
        lessonId: "lesson-loops",
        order: 3,
        complexity: "advanced",
        title: { en: "Shift Register: a running sum", ru: "Сдвиговый регистр: накопительная сумма", uz: "Shift register: joriy yig'indi" },
        description: {
          en: "A shift register carries the running total from one iteration to the next as the For Loop accumulates the sum of 1 to N.",
          ru: "Сдвиговый регистр переносит текущую сумму из одной итерации в следующую, пока цикл For накапливает сумму от 1 до N.",
          uz: "For sikli 1 dan N gacha yig'indini to'plar ekan, shift register joriy yig'indini bir iteratsiyadan keyingisiga olib o'tadi.",
        },
      },
    ],
  },

  // ─── Lesson 6: Arrays in LabVIEW ──────────────────────────────────────────
  {
    id: "lesson-arrays",
    title: {
      en: "Arrays in LabVIEW",
      ru: "Массивы в LabVIEW",
      uz: "LabVIEWda massivlar",
    },
    slug: "arrays",
    category: "arrays",
    difficulty: "beginner",
    durationMinutes: 40,
    thumbnailUrl: "",
    presentationUrl: "/assets/pdfs/arrays.pdf",
    order: 6,
    isPublished: true,
    createdAt: "2026-01-22",
    tags: [
      { en: "Arrays", ru: "Массивы", uz: "Massivlar" },
      { en: "Auto-Indexing", ru: "Авто-индексация", uz: "Avto-indekslash" },
      { en: "Data Structures", ru: "Структуры данных", uz: "Ma'lumot tuzilmalari" },
    ],
    summaries: [
      {
        id: "arr-s1", lessonId: "lesson-arrays", order: 1,
        sectionTitle: { en: "What is an Array?", ru: "Что такое массив?", uz: "Massiv nima?" },
        paragraphs: [
          {
            en: "An array is a data structure that stores multiple values of the same data type in a single variable. Arrays are essential for efficiently storing, processing, and analysing large amounts of data such as measurement results, sensor readings, and signal-processing data. They reduce programming complexity and manage collections of related data far better than individual variables.",
            ru: "Массив — это структура данных, хранящая несколько значений одного типа в одной переменной. Массивы необходимы для эффективного хранения, обработки и анализа больших объёмов данных, таких как результаты измерений, показания датчиков и данные обработки сигналов. Они снижают сложность программирования и управляют коллекциями связанных данных гораздо лучше, чем отдельные переменные.",
            uz: "Massiv — bir xil turdagi bir nechta qiymatni bitta o'zgaruvchida saqlaydigan ma'lumot tuzilmasi. Massivlar o'lchov natijalari, sensor ko'rsatkichlari va signal qayta ishlash ma'lumotlari kabi katta hajmdagi ma'lumotni samarali saqlash, qayta ishlash va tahlil qilish uchun zarur. Ular dasturlash murakkabligini kamaytiradi va bog'liq ma'lumotlar to'plamini alohida o'zgaruvchilarga qaraganda ancha yaxshi boshqaradi.",
          },
        ],
      },
      {
        id: "arr-s2", lessonId: "lesson-arrays", order: 2,
        sectionTitle: { en: "Array Structure", ru: "Структура массива", uz: "Massiv tuzilishi" },
        paragraphs: [
          {
            en: "In LabVIEW an array has two parts: the array shell, which defines its structure and dimensions, and the element, which sets the data type stored inside. Every element must share the same data type — numeric, Boolean, string, cluster, or waveform. This uniform structure ensures efficient memory use and processing.",
            ru: "В LabVIEW массив состоит из двух частей: оболочки массива, задающей его структуру и размерности, и элемента, определяющего тип хранимых данных. Все элементы должны иметь один тип — числовой, булев, строковый, кластер или сигнал. Такая однородная структура обеспечивает эффективное использование памяти и обработку.",
            uz: "LabVIEWda massiv ikki qismdan iborat: massiv qobig'i uning tuzilishi va o'lchamlarini belgilaydi, element esa ichida saqlanadigan ma'lumot turini belgilaydi. Har bir element bir xil turdagi bo'lishi shart — sonli, Boolean, satr, cluster yoki waveform. Bu bir xil tuzilma xotiradan samarali foydalanish va qayta ishlashni ta'minlaydi.",
          },
        ],
      },
      {
        id: "arr-s3", lessonId: "lesson-arrays", order: 3,
        sectionTitle: { en: "1D and 2D Arrays", ru: "Одномерные и двумерные массивы", uz: "1D va 2D massivlar" },
        paragraphs: [
          {
            en: "A one-dimensional array stores data in a single sequence, e.g. [10, 20, 30, 40, 50] — the most common type, used for sensor readings, temperature measurements, voltage samples, and data-acquisition results. A two-dimensional array stores data in rows and columns like a table or matrix, used for matrix calculations, image processing, simulations, and statistical analysis.",
            ru: "Одномерный массив хранит данные в одной последовательности, например [10, 20, 30, 40, 50] — самый распространённый тип, применяемый для показаний датчиков, измерений температуры, выборок напряжения и результатов сбора данных. Двумерный массив хранит данные в строках и столбцах, как таблица или матрица, и используется для матричных вычислений, обработки изображений, симуляций и статистического анализа.",
            uz: "Bir o'lchovli massiv ma'lumotni bitta ketma-ketlikda saqlaydi, masalan [10, 20, 30, 40, 50] — eng keng tarqalgan tur, sensor ko'rsatkichlari, harorat o'lchovlari, kuchlanish namunalari va ma'lumot yig'ish natijalari uchun ishlatiladi. Ikki o'lchovli massiv ma'lumotni jadval yoki matritsa kabi satr va ustunlarda saqlaydi, matritsa hisoblari, tasvirni qayta ishlash, simulyatsiyalar va statistik tahlil uchun ishlatiladi.",
          },
        ],
      },
      {
        id: "arr-s4", lessonId: "lesson-arrays", order: 4,
        sectionTitle: { en: "Array Operations", ru: "Операции с массивами", uz: "Massiv amallari" },
        paragraphs: [
          {
            en: "LabVIEW provides many built-in array functions. Build Array combines elements or arrays into one; Index Array extracts one or more elements; Array Size reports the number of elements; Delete From Array removes elements; Insert Into Array adds elements at a position; and Replace Array Subset swaps existing values for new data. These operations simplify data handling and processing.",
            ru: "LabVIEW предоставляет множество встроенных функций для массивов. Build Array объединяет элементы или массивы в один; Index Array извлекает один или несколько элементов; Array Size сообщает число элементов; Delete From Array удаляет элементы; Insert Into Array добавляет элементы в указанную позицию; Replace Array Subset заменяет существующие значения новыми. Эти операции упрощают работу с данными.",
            uz: "LabVIEW massivlar uchun ko'plab ichki funksiyalarni taqdim etadi. Build Array elementlar yoki massivlarni bittaga birlashtiradi; Index Array bir yoki bir nechta elementni ajratib oladi; Array Size elementlar sonini bildiradi; Delete From Array elementlarni o'chiradi; Insert Into Array belgilangan joyga element qo'shadi; Replace Array Subset mavjud qiymatlarni yangisiga almashtiradi. Bu amallar ma'lumotlar bilan ishlashni soddalashtiradi.",
          },
        ],
      },
      {
        id: "arr-s5", lessonId: "lesson-arrays", order: 5,
        sectionTitle: { en: "Auto-Indexing & Multidimensional Arrays", ru: "Авто-индексация и многомерные массивы", uz: "Avto-indekslash va ko'p o'lchovli massivlar" },
        paragraphs: [
          {
            en: "When an array is wired to a For Loop, LabVIEW's auto-indexing automatically processes one element per iteration, reducing manual indexing and improving readability — ideal for repetitive calculations and data analysis. LabVIEW also supports multidimensional arrays (3D and beyond) for 3D measurement data, scientific simulations, and image/video processing, though they need careful memory management.",
            ru: "Когда массив подключён к циклу For, авто-индексация LabVIEW автоматически обрабатывает один элемент за итерацию, сокращая ручную индексацию и улучшая читаемость — идеально для повторяющихся вычислений и анализа данных. LabVIEW также поддерживает многомерные массивы (3D и более) для трёхмерных данных измерений, научных симуляций и обработки изображений/видео, но они требуют аккуратного управления памятью.",
            uz: "Massiv For siklga ulanganda LabVIEWning avto-indekslashi har iteratsiyada bitta elementni avtomatik qayta ishlaydi, qo'lda indekslashni kamaytiradi va o'qishni yaxshilaydi — takrorlanuvchi hisoblar va ma'lumot tahlili uchun ideal. LabVIEW shuningdek 3D va undan yuqori ko'p o'lchovli massivlarni qo'llab-quvvatlaydi (3D o'lchov ma'lumotlari, ilmiy simulyatsiyalar, tasvir/video qayta ishlash), lekin ular xotirani ehtiyotkorlik bilan boshqarishni talab qiladi.",
          },
        ],
      },
      {
        id: "arr-s6", lessonId: "lesson-arrays", order: 6,
        sectionTitle: { en: "Memory, Errors & Best Practices", ru: "Память, ошибки и лучшие практики", uz: "Xotira, xatolar va eng yaxshi amaliyotlar" },
        paragraphs: [
          {
            en: "Because arrays can hold large amounts of data, use appropriate sizes, avoid unnecessary copies, remove unused data, and monitor memory consumption. Common errors include index out-of-range, dimension mismatches, data-type conflicts, and incorrect sizing. Best practices: use meaningful names, validate dimensions, use built-in array functions, apply auto-indexing where appropriate, and test with different dataset sizes.",
            ru: "Поскольку массивы могут хранить большие объёмы данных, используйте подходящие размеры, избегайте лишних копий, удаляйте неиспользуемые данные и следите за потреблением памяти. Частые ошибки: выход индекса за пределы, несоответствие размерностей, конфликты типов данных и неверный размер. Лучшие практики: использовать понятные имена, проверять размерности, применять встроенные функции массивов, использовать авто-индексацию там, где уместно, и тестировать на разных объёмах данных.",
            uz: "Massivlar katta hajmdagi ma'lumot saqlashi mumkinligi sababli mos o'lchamlardan foydalaning, ortiqcha nusxalardan qoching, ishlatilmaydigan ma'lumotni o'chiring va xotira sarfini kuzating. Keng tarqalgan xatolar: indeks chegaradan chiqishi, o'lcham mosligi yo'qligi, ma'lumot turi ziddiyatlari va noto'g'ri o'lcham. Eng yaxshi amaliyotlar: mazmunli nomlar qo'yish, o'lchamlarni tekshirish, ichki massiv funksiyalaridan foydalanish, o'rinli joyda avto-indekslashni qo'llash va turli hajmdagi ma'lumotlarda sinash.",
          },
        ],
      },
    ],
    visualizationExamples: [
      {
        id: "viz_index_array",
        lessonId: "lesson-arrays",
        order: 1,
        complexity: "simple",
        title: { en: "Index Array: read one element", ru: "Index Array: чтение элемента", uz: "Index Array: elementni o'qish" },
        description: {
          en: "An array [10, 20, 30, 40] and an index value feed the Index Array function, which extracts the element at that position.",
          ru: "Массив [10, 20, 30, 40] и значение индекса подаются на функцию Index Array, извлекающую элемент в этой позиции.",
          uz: "[10, 20, 30, 40] massivi va indeks qiymati Index Array funksiyasiga uzatiladi, u o'sha pozitsiyadagi elementni ajratib oladi.",
        },
      },
      {
        id: "viz_array_autoindex",
        lessonId: "lesson-arrays",
        order: 2,
        complexity: "advanced",
        title: { en: "Auto-Indexing: process an array in a loop", ru: "Авто-индексация: обработка массива в цикле", uz: "Avto-indekslash: massivni siklda qayta ishlash" },
        description: {
          en: "An array wired to a For Loop is auto-indexed — one element per iteration is processed and indexed back out into a new array.",
          ru: "Массив, подключённый к циклу For, авто-индексируется — за итерацию обрабатывается один элемент и индексируется обратно в новый массив.",
          uz: "For siklga ulangan massiv avto-indekslanadi — har iteratsiyada bitta element qayta ishlanadi va yangi massivga qaytariladi.",
        },
      },
      {
        id: "viz_build_array",
        lessonId: "lesson-arrays",
        order: 3,
        complexity: "advanced",
        title: { en: "Build Array & Array Size", ru: "Build Array и Array Size", uz: "Build Array va Array Size" },
        description: {
          en: "Two arrays are merged by Build Array into one, and Array Size reports the element count of the result.",
          ru: "Два массива объединяются функцией Build Array в один, а Array Size сообщает число элементов результата.",
          uz: "Ikki massiv Build Array funksiyasi bilan bittaga birlashtiriladi, Array Size esa natijaning element sonini bildiradi.",
        },
      },
    ],
  },

  // ─── Lesson 7: Iteration and Branching Processes ──────────────────────────
  {
    id: "lesson-branching",
    title: {
      en: "Iteration and Branching Processes",
      ru: "Процессы итерации и ветвления",
      uz: "Iteratsiya va tarmoqlanish jarayonlari",
    },
    slug: "iteration-branching",
    category: "structures",
    difficulty: "advanced",
    durationMinutes: 45,
    thumbnailUrl: "",
    presentationUrl: "/assets/pdfs/iteration-branching.pdf",
    order: 7,
    isPublished: true,
    createdAt: "2026-01-24",
    tags: [
      { en: "Case Structure", ru: "Case-структура", uz: "Case strukturasi" },
      { en: "Loops", ru: "Циклы", uz: "Sikllar" },
      { en: "Decision Logic", ru: "Логика решений", uz: "Qaror mantig'i" },
    ],
    summaries: [
      {
        id: "br-s1", lessonId: "lesson-branching", order: 1,
        sectionTitle: { en: "Iteration and Branching", ru: "Итерация и ветвление", uz: "Iteratsiya va tarmoqlanish" },
        paragraphs: [
          {
            en: "Modern engineering applications must make decisions and repeat operations. In LabVIEW this is done with iteration and branching structures. Iteration runs a set of operations repeatedly, while branching chooses different execution paths based on conditions. Together they form the foundation of dynamic, intelligent VIs that respond to changing inputs, user actions, and real-world conditions.",
            ru: "Современные инженерные приложения должны принимать решения и повторять операции. В LabVIEW это делается с помощью структур итерации и ветвления. Итерация многократно выполняет набор операций, а ветвление выбирает разные пути выполнения в зависимости от условий. Вместе они образуют основу динамичных, «умных» VI, реагирующих на изменяющиеся входы, действия пользователя и реальные условия.",
            uz: "Zamonaviy muhandislik ilovalari qaror qabul qilishi va amallarni takrorlashi kerak. LabVIEWda bu iteratsiya va tarmoqlanish strukturalari bilan amalga oshiriladi. Iteratsiya amallar to'plamini takror bajaradi, tarmoqlanish esa shartlarga qarab turli bajarilish yo'llarini tanlaydi. Birgalikda ular o'zgaruvchan kirishlar, foydalanuvchi harakatlari va real sharoitlarga javob beradigan dinamik, aqlli VIlar asosini tashkil etadi.",
          },
        ],
      },
      {
        id: "br-s2", lessonId: "lesson-branching", order: 2,
        sectionTitle: { en: "Iterative Processes: While & For", ru: "Итеративные процессы: While и For", uz: "Iterativ jarayonlar: While va For" },
        paragraphs: [
          {
            en: "LabVIEW offers two primary loops. The While Loop repeats until a Boolean stop condition becomes true — ideal for continuous monitoring and real-time systems. The For Loop runs a predetermined number of times and terminates automatically — efficient for repetitive calculations, array processing, and statistical analysis. Choosing the right loop depends on whether the iteration count is known in advance.",
            ru: "LabVIEW предлагает два основных цикла. Цикл While повторяется, пока булево условие остановки не станет истинным — идеален для непрерывного мониторинга и систем реального времени. Цикл For выполняется заданное число раз и завершается автоматически — эффективен для повторяющихся вычислений, обработки массивов и статистического анализа. Выбор цикла зависит от того, известно ли число итераций заранее.",
            uz: "LabVIEW ikkita asosiy siklni taklif etadi. While sikli Boolean to'xtash sharti rost bo'lguncha takrorlanadi — uzluksiz monitoring va real vaqt tizimlari uchun ideal. For sikli oldindan belgilangan marta ishlaydi va avtomatik tugaydi — takrorlanuvchi hisoblar, massivlarni qayta ishlash va statistik tahlil uchun samarali. Sikl tanlash iteratsiyalar soni oldindan ma'lum yoki yo'qligiga bog'liq.",
          },
        ],
      },
      {
        id: "br-s3", lessonId: "lesson-branching", order: 3,
        sectionTitle: { en: "Branching & the Case Structure", ru: "Ветвление и Case-структура", uz: "Tarmoqlanish va Case strukturasi" },
        paragraphs: [
          {
            en: "Branching lets a program choose different execution paths depending on conditions, and LabVIEW implements it mainly with the Case Structure — the equivalent of an if-else statement. A condition is evaluated and the matching case runs. Cases can be True/False, numeric selections, or string-based, supporting decision making, user-interface control, error handling, and system mode selection.",
            ru: "Ветвление позволяет программе выбирать разные пути выполнения в зависимости от условий, и LabVIEW реализует его в основном с помощью Case-структуры — аналога оператора if-else. Условие вычисляется, и выполняется соответствующий вариант. Варианты могут быть True/False, числовыми или строковыми, поддерживая принятие решений, управление интерфейсом, обработку ошибок и выбор режима системы.",
            uz: "Tarmoqlanish dasturga shartlarga qarab turli bajarilish yo'llarini tanlash imkonini beradi va LabVIEW buni asosan Case strukturasi bilan amalga oshiradi — bu if-else operatorining ekvivalenti. Shart baholanadi va mos keladigan holat bajariladi. Holatlar True/False, sonli yoki satrli bo'lishi mumkin, qaror qabul qilish, interfeys boshqaruvi, xato boshqaruvi va tizim rejimini tanlashni qo'llab-quvvatlaydi.",
          },
        ],
      },
      {
        id: "br-s4", lessonId: "lesson-branching", order: 4,
        sectionTitle: { en: "Combining Loops and Case Structures", ru: "Сочетание циклов и Case-структур", uz: "Sikllar va Case strukturalarini birlashtirish" },
        paragraphs: [
          {
            en: "In practice, iteration and branching work together. For example, a While Loop continuously acquires sensor data, a Case Structure evaluates the measured value, and different actions run depending on the result — e.g. if temperature > 80°C display a warning, else continue monitoring. This pattern forms the basis of many automated control systems.",
            ru: "На практике итерация и ветвление работают вместе. Например, цикл While непрерывно получает данные датчика, Case-структура оценивает измеренное значение, и в зависимости от результата выполняются разные действия — например, если температура > 80°C, показать предупреждение, иначе продолжать мониторинг. Этот шаблон лежит в основе многих систем автоматического управления.",
            uz: "Amalda iteratsiya va tarmoqlanish birga ishlaydi. Masalan, While sikli sensor ma'lumotini uzluksiz oladi, Case strukturasi o'lchangan qiymatni baholaydi va natijaga qarab turli amallar bajariladi — masalan, harorat > 80°C bo'lsa ogohlantirish ko'rsatish, aks holda monitoringni davom ettirish. Bu naqsh ko'plab avtomatik boshqaruv tizimlari asosini tashkil etadi.",
          },
        ],
      },
      {
        id: "br-s5", lessonId: "lesson-branching", order: 5,
        sectionTitle: { en: "Nested Structures & Decision Logic", ru: "Вложенные структуры и логика решений", uz: "Ichma-ich strukturalar va qaror mantig'i" },
        paragraphs: [
          {
            en: "LabVIEW allows structures inside one another — a Case Structure inside a While Loop, a loop inside a case, and so on — enabling advanced automation, multi-stage decision making, and process control, though excessive nesting adds complexity. Shift Registers can be combined with branching to store and compare previous values, for example detecting abnormal behaviour by comparing current and previous sensor readings.",
            ru: "LabVIEW допускает вложение структур друг в друга — Case-структура внутри цикла While, цикл внутри варианта и т. д. — что обеспечивает продвинутую автоматизацию, многоступенчатое принятие решений и управление процессами, хотя чрезмерная вложенность усложняет программу. Сдвиговые регистры можно сочетать с ветвлением для хранения и сравнения предыдущих значений, например для выявления аномалий по сравнению текущих и прошлых показаний датчика.",
            uz: "LabVIEW strukturalarni bir-birining ichiga joylashga ruxsat beradi — While sikli ichidagi Case strukturasi, holat ichidagi sikl va h.k. — bu ilg'or avtomatlashtirish, ko'p bosqichli qaror qabul qilish va jarayon boshqaruvini ta'minlaydi, garchi ortiqcha ichma-ichlik murakkablikni oshirsa ham. Shift registerlar tarmoqlanish bilan birlashtirilib, oldingi qiymatlarni saqlash va taqqoslash mumkin, masalan joriy va oldingi sensor ko'rsatkichlarini solishtirib g'ayritabiiy holatni aniqlash.",
          },
        ],
      },
      {
        id: "br-s6", lessonId: "lesson-branching", order: 6,
        sectionTitle: { en: "Applications & Best Practices", ru: "Применение и лучшие практики", uz: "Qo'llanilishi va eng yaxshi amaliyotlar" },
        paragraphs: [
          {
            en: "Iteration and branching power automated temperature control, traffic-light simulation, industrial monitoring, and laboratory experiments. Common errors include infinite loops, incorrect stop conditions, and missing case definitions. Best practices: define clear stop conditions, keep Case Structures organised, use descriptive labels, avoid excessive nesting, test all execution paths, implement error handling, and use shift registers when previous data is needed.",
            ru: "Итерация и ветвление лежат в основе автоматического управления температурой, симуляции светофора, промышленного мониторинга и лабораторных экспериментов. Частые ошибки: бесконечные циклы, неверные условия остановки и отсутствующие определения вариантов. Лучшие практики: задавать чёткие условия остановки, держать Case-структуры упорядоченными, использовать понятные подписи, избегать чрезмерной вложенности, тестировать все пути выполнения, реализовывать обработку ошибок и применять сдвиговые регистры, когда нужны предыдущие данные.",
            uz: "Iteratsiya va tarmoqlanish avtomatik harorat boshqaruvi, svetofor simulyatsiyasi, sanoat monitoringi va laboratoriya tajribalari asosida yotadi. Keng tarqalgan xatolar: cheksiz sikllar, noto'g'ri to'xtash shartlari va aniqlanmagan holatlar. Eng yaxshi amaliyotlar: aniq to'xtash shartlarini belgilash, Case strukturalarini tartibli saqlash, mazmunli yorliqlardan foydalanish, ortiqcha ichma-ichlikdan qochish, barcha bajarilish yo'llarini sinash, xato boshqaruvini joriy etish va oldingi ma'lumot kerak bo'lganda shift registerlardan foydalanish.",
          },
        ],
      },
    ],
    visualizationExamples: [
      {
        id: "viz_case_decision",
        lessonId: "lesson-branching",
        order: 1,
        complexity: "simple",
        title: { en: "Case Structure: branching on a condition", ru: "Case-структура: ветвление по условию", uz: "Case strukturasi: shart bo'yicha tarmoqlanish" },
        description: {
          en: "A temperature is compared to 80; the Case Structure runs the matching branch — here the True path triggers a warning while the False path stays idle.",
          ru: "Температура сравнивается с 80; Case-структура выполняет соответствующую ветвь — здесь путь True вызывает предупреждение, а путь False остаётся неактивным.",
          uz: "Harorat 80 bilan taqqoslanadi; Case strukturasi mos tarmoqni bajaradi — bu yerda True yo'li ogohlantirishni ishga tushiradi, False yo'li esa nofaol qoladi.",
        },
      },
      {
        id: "viz_loop_case",
        lessonId: "lesson-branching",
        order: 2,
        complexity: "advanced",
        title: { en: "Loop + Case: a monitoring system", ru: "Цикл + Case: система мониторинга", uz: "Sikl + Case: monitoring tizimi" },
        description: {
          en: "A While Loop reads a sensor each iteration and a Case Structure picks the branch — OK while readings are normal, Warning once a reading exceeds 80.",
          ru: "Цикл While читает датчик на каждой итерации, а Case-структура выбирает ветвь — OK при нормальных значениях и Warning, когда значение превышает 80.",
          uz: "While sikli har iteratsiyada sensorni o'qiydi va Case strukturasi tarmoqni tanlaydi — qiymatlar normal bo'lsa OK, qiymat 80 dan oshganda Warning.",
        },
      },
      {
        id: "viz_sr_compare",
        lessonId: "lesson-branching",
        order: 3,
        complexity: "advanced",
        title: { en: "Shift Register + branch: detect a spike", ru: "Сдвиговый регистр + ветвление: обнаружение скачка", uz: "Shift register + tarmoq: sakrashni aniqlash" },
        description: {
          en: "A shift register remembers the previous reading; each iteration the change is compared to a threshold and the branch raises an alarm on a large jump.",
          ru: "Сдвиговый регистр хранит предыдущее значение; на каждой итерации изменение сравнивается с порогом, и ветвь поднимает тревогу при большом скачке.",
          uz: "Shift register oldingi qiymatni saqlaydi; har iteratsiyada o'zgarish chegara bilan solishtiriladi va katta sakrashda tarmoq signal beradi.",
        },
      },
    ],
  },
];

export function getLessonById(id: string): VideoLesson | undefined {
  return MOCK_LESSONS.find((l) => l.id === id);
}

export function getLessonsByCategory(category: string): VideoLesson[] {
  return MOCK_LESSONS.filter((l) => l.category === category);
}
