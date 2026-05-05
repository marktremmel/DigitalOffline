// Worksheet content for grades 5–8.
// Each worksheet mixes critical-thinking-focused activities of multiple types:
//   instruction / note / richtext (display-only)
//   mcq / multiselect / truefalse / match / rank / tag / fillblanks / hotspot / shorttext / scenario
// Where appropriate, `correct` is provided so the teacher decoder can auto-grade.

export const worksheetsData = [
  /* ============================== GRADE 5 ============================== */

  {
    id: 'perfect-day',
    title: 'My (Almost) Perfect Day',
    eyebrow: 'Grade 5 · Digital Wellbeing',
    scribble: 'balance is a feeling, not a stopwatch',
    subtitle: 'Imagine your dream day, then stress-test it.',
    grade: 5,
    topic: 'Digital Wellbeing',
    content: [
      {
        type: 'instruction',
        kind: 'task',
        text: "Sketch out the perfect day for you. There are no wrong answers — just don't skip any time of day. Then we're going to put your day under a microscope."
      },
      {
        type: 'shorttext',
        id: 'morning',
        label: '1 · Morning. From the moment you wake up until lunch — what would you do?',
        rows: 3,
        placeholder: 'Wake up at… eat… do…'
      },
      {
        type: 'shorttext',
        id: 'day',
        label: '2 · Daytime. Lunch until late afternoon — what fills the hours?',
        rows: 3
      },
      {
        type: 'shorttext',
        id: 'evening',
        label: '3 · Evening. Dinner-ish until bedtime?',
        rows: 3
      },
      {
        type: 'shorttext',
        id: 'night',
        label: '4 · Night. The very last hour before sleep?',
        rows: 2
      },
      {
        type: 'instruction',
        kind: 'clue',
        text: 'Now look back at the day you wrote. We are going to label what kind of activity each part is.'
      },
      {
        type: 'tag',
        id: 'tags',
        label: '5 · For each block of your day, pick the closest category.',
        items: ['Morning', 'Daytime', 'Evening', 'Night'],
        categories: ['Screen', 'Outside', 'With people', 'Alone time', 'Creating'],
        helper: 'There is no perfect mix. The point is to notice what you reached for.'
      },
      {
        type: 'truefalse',
        id: 'tf-balance',
        label: '6 · True or False: "Balance" means spending equal time on every category.',
        correct: false
      },
      {
        type: 'mcq',
        id: 'best-balance',
        label: '7 · Which of these schedules looks like the healthiest balance for a school day?',
        options: [
          'A: 4 hours of gaming, 1 hour of homework, 0 hours outside.',
          'B: 1 hour of gaming, 1 hour outside, 1 hour with family, homework, sleep.',
          'C: 3 hours of homework, 3 hours of TV, 30 minutes of sleep.',
          'D: 5 hours scrolling, 30 minutes outside, no homework.'
        ],
        correct: 1
      },
      {
        type: 'shorttext',
        id: 'week-test',
        label: '8 · Imagine living your "perfect day" 7 days in a row. What would start to feel awful — and why?',
        rows: 3,
        helper: "Critical thinking move: what's missing from a thing is often more important than what's in it."
      },
      {
        type: 'shorttext',
        id: 'one-swap',
        label: '9 · Pick ONE thing you would swap to make your day feel better over a whole week. Be specific.',
        rows: 2
      }
    ]
  },

  {
    id: 'spot-the-clickbait',
    title: "You Won't Believe This",
    eyebrow: 'Grade 5 · News & Misinformation',
    scribble: 'spot the bait. don\'t bite.',
    subtitle: 'Headlines are designed to trick your brain. Here is how.',
    grade: 5,
    topic: 'News & Misinformation',
    content: [
      {
        type: 'instruction',
        kind: 'tip',
        text: 'Clickbait uses the "curiosity gap" — your brain hates not knowing the rest of the story, so you click. Three clues: 1) it sounds impossible, 2) it shocks you, 3) it drops a celebrity name.'
      },
      {
        type: 'tag',
        id: 'tag-headlines',
        label: '1 · Tag each headline with the strongest clickbait clue at work.',
        items: [
          '"Doctors HATE this one weird trick to lose 10kg in a week."',
          '"BBC: New EU climate report finds emissions up 1.4% in 2025."',
          '"Kylie Jenner used CORN OIL on her hair?? You won\'t believe what happened next."',
          '"Government announces local school holiday on May 7."',
          '"You\'ll never guess what this 7-year-old said to a lion."'
        ],
        categories: ['Impossible', 'Shock', 'Celebrity', 'Not clickbait'],
        correct: [0, 3, 2, 3, 1]
      },
      {
        type: 'multiselect',
        id: 'why-trick',
        label: '2 · Why do clickbait sites make their headlines this way? (Pick all that apply)',
        options: [
          'They get paid by advertisers per click.',
          'They are required to tell the truth.',
          'A big number of clicks lets them charge more for ads.',
          'It is the easiest way to get your attention quickly.',
          'It is part of being a real journalist.'
        ],
        correct: [0, 2, 3]
      },
      {
        type: 'truefalse',
        id: 'tf-clicks',
        label: '3 · True or False: "If lots of people clicked it, it must be true."',
        correct: false
      },
      {
        type: 'rank',
        id: 'rank-bait',
        label: '4 · Rank these headlines from MOST to LEAST baity.',
        topLabel: 'Most baity',
        bottomLabel: 'Least baity',
        items: [
          '"5 dinner ideas under 20 minutes" — recipe blog',
          '"This free app stole my whole life. Here\'s what happened next."',
          '"Government raises bus fares from 350 HUF to 400 HUF."',
          '"BREAKING: Aliens land in Buda — pictures inside!!"'
        ]
      },
      {
        type: 'hotspot',
        id: 'spot-bait',
        label: '5 · Tap the parts of this fake headline that are baiting you.',
        passage:
          "DOCTORS ARE {{0}}: this {{1}} from a {{2}} can {{3}}.",
        spans: ['TERRIFIED', 'ONE WEIRD TRICK', 'famous popstar', 'melt your homework in 12 SECONDS'],
        correct: [0, 1, 2, 3]
      },
      {
        type: 'shorttext',
        id: 'write-bait',
        label: '6 · Now write your OWN clickbait headline, then explain the trick you used.',
        rows: 4,
        placeholder: 'My headline:\nThe trick I used:'
      }
    ]
  },

  {
    id: 'hearts-two-friends',
    title: "Heart's Two Friends",
    eyebrow: 'Grade 5 · Online Friendship',
    scribble: 'private ≠ rude',
    subtitle: 'Two online friendships look the same on the outside. They are not.',
    grade: 5,
    topic: 'Online Friendship & Cyberbullying',
    content: [
      {
        type: 'scenario',
        id: 'kaia',
        title: 'Scenario A · Kaia',
        story:
          "Heart's class is doing a video-chat project with a 'sister' school in Jaipur. Heart is paired with a student named Kaia. They talk face-to-face on a school video call. Kaia is funny and they discover they both use PhotoFun. At the end of class, Kaia asks if she can follow Heart on PhotoFun.",
        questions: [
          {
            type: 'mcq',
            id: 'mcq-kaia',
            label: 'What should Heart do?',
            options: [
              'Block Kaia immediately. Anyone online is a stranger.',
              'Follow back. The school set up the call and her teachers know Kaia.',
              'Send her phone number first to make sure they stay in touch.'
            ],
            correct: 1
          },
          {
            type: 'shorttext',
            id: 'why-kaia',
            label: 'Why is this friendship low-risk? Name two reasons.',
            rows: 2
          }
        ]
      },
      {
        type: 'scenario',
        id: 'cj',
        title: 'Scenario B · CJcool11',
        story:
          "Heart has been chatting with someone named CJcool11 for two months after he commented on a photo of her dog. She doesn't know his real name or age. Today he messages: 'My annoying neighbor never cleans up after his dog.' Heart replies, 'Rude. Everyone on my street always does.' He answers: 'Rly? What street do you live on?' Her stomach feels funny.",
        questions: [
          {
            type: 'multiselect',
            id: 'private-info',
            label: 'Tap every piece of PRIVATE information from this list.',
            options: [
              'Your favorite color',
              'The street you live on',
              'Your full name',
              'Your favorite cartoon',
              'Your school name',
              'Your family\'s phone number',
              'A meme you like'
            ],
            correct: [1, 2, 4, 5]
          },
          {
            type: 'mcq',
            id: 'mcq-cj',
            label: 'What\'s the smartest move when a chat starts feeling weird?',
            options: [
              'Answer with a fake street so he stops bugging you.',
              'Tell him you don\'t share private info, screenshot it, and tell a trusted adult.',
              'Stop replying and never mention it to anyone.',
              'Send the info — you\'ve been friends for months.'
            ],
            correct: 1
          },
          {
            type: 'shorttext',
            id: 'reply-cj',
            label: 'Type the actual message Heart should send back.',
            rows: 2,
            placeholder: 'Hey CJ, …'
          }
        ]
      },
      {
        type: 'tag',
        id: 'venn',
        label: 'Compare the two friendships. Where does each detail fit?',
        items: [
          'Heart can see the friend\'s face',
          'A teacher set the meeting up',
          'They share funny dog stories',
          'The friend asked for her street',
          'They talk on PhotoFun',
          'Heart doesn\'t know the friend\'s real name or age'
        ],
        categories: ['Kaia only', 'Both', 'CJcool11 only'],
        correct: [0, 0, 1, 2, 1, 2]
      },
      {
        type: 'truefalse',
        id: 'tf-time-rule',
        label: 'True or False: "If we\'ve been online friends for three months, it\'s safe to share my address."',
        correct: false
      }
    ]
  },

  /* ============================== GRADE 6 ============================== */

  {
    id: 'anatomy-news-page',
    title: 'Anatomy of a News Page',
    eyebrow: 'Grade 6 · News & Misinformation',
    scribble: 'not all of it is news',
    subtitle: 'The page looks like one thing. It is actually six.',
    grade: 6,
    topic: 'News & Misinformation',
    content: [
      {
        type: 'instruction',
        kind: 'clue',
        text: "An online news page is a sandwich: real journalism + ads + sponsored stories + comments + recommendations. Knowing which is which is the first job of a news reader."
      },
      {
        type: 'match',
        id: 'parts',
        label: '1 · Drag the right column so each label lines up with its job.',
        leftItems: ['Headline', 'Byline', 'URL', 'Section title', 'Sponsored content', 'Advertisement', 'Comments'],
        rightItems: [
          'The big bold title at the top of an article.',
          'The name of the person who wrote it.',
          'The unique web address of the page.',
          'The category — e.g. World, Sports, Tech.',
          'A story that looks like an article but was paid for by a brand.',
          'A clickable banner trying to sell you something.',
          'Reader replies — opinions, not journalism.'
        ],
        correct: [0, 1, 2, 3, 4, 5, 6]
      },
      {
        type: 'hotspot',
        id: 'fake-page',
        label: '2 · Tap every part of this page that is NOT actual news.',
        helper: 'Imagine this is the page; you are circling the parts you would skip.',
        passage:
          "[ {{0}} ]\n\nNews / Tech\n\nResearchers find new way to detect deepfakes\nBy Sara Kovács · 4 May 2026\n\nThe team published their tool yesterday in Nature. {{1}}\n\nThe paper has been peer-reviewed. {{2}}\n\nCOMMENTS:\n→ {{3}}",
        spans: [
          'AD: 70% off sneakers — click NOW',
          'SPONSORED: Why CleanFlow makes your phone faster — paid by CleanFlow',
          'AD: 1 weird trick to learn German',
          '"this is fake!! my cousin works at TikTok"'
        ],
        correct: [0, 1, 2, 3]
      },
      {
        type: 'multiselect',
        id: 'trust-signals',
        label: '3 · Which of these are signs the article is more likely trustworthy? (Pick all that apply)',
        options: [
          'Has a real author name (byline).',
          'Recent date.',
          'Lots of UPPERCASE WORDS in the headline.',
          'Cites where its facts come from.',
          'Asks you to share before you read.',
          'On a website you can find an "About" page for.'
        ],
        correct: [0, 1, 3, 5]
      },
      {
        type: 'truefalse',
        id: 'tf-news-site',
        label: '4 · True or False: "If it appears on a news website, it must be news."',
        correct: false
      },
      {
        type: 'shorttext',
        id: 'two-checks',
        label: '5 · Name two checks YOU could run before you trust an online news article.',
        rows: 2
      }
    ]
  },

  {
    id: 'beyond-avatar',
    title: 'Beyond the Avatar',
    eyebrow: 'Grade 6 · Stereotypes & Representation',
    scribble: 'just because… doesn\'t mean.',
    subtitle: 'Stereotypes are oversimplifications. Today we notice and challenge them.',
    grade: 6,
    topic: 'Stereotypes & Representation',
    content: [
      {
        type: 'instruction',
        kind: 'tip',
        text: 'A stereotype is a simple "rule" about a whole group of people. Some are obvious; some are baked into design choices we never question.'
      },
      {
        type: 'multiselect',
        id: 'stereo-vs-fact',
        label: '1 · Which of these are stereotypes (oversimplifications about a group)?',
        options: [
          'Boys are not allowed to cry.',
          'The human heart pumps blood.',
          'Girls are bad at maths.',
          'Most flowers need water.',
          'Gamers are all loud and competitive.',
          'The Earth orbits the Sun.'
        ],
        correct: [0, 2, 4]
      },
      {
        type: 'tag',
        id: 'tag-traits',
        label: '2 · Drag each trait onto where it usually shows up in a "default girl" or "default boy" video-game avatar.',
        items: ['Pink hair option', 'Big armoured shoulder pads', 'Eyelashes', 'Visible muscles', 'Tiny waist', 'Loud "battle yell" voice line'],
        categories: ['"Default girl" character', '"Default boy" character', 'Either / both'],
        correct: [0, 1, 0, 1, 0, 1],
        helper: 'There is no one right answer for every item — pick the closest. We will discuss as a class.'
      },
      {
        type: 'rank',
        id: 'rank-power',
        label: '3 · Rank these in-game design choices from "reinforces stereotypes" to "challenges them."',
        topLabel: 'Reinforces',
        bottomLabel: 'Challenges',
        items: [
          'Female characters get fewer fighting moves than male ones.',
          'Players choose any pronouns and any body shape.',
          'Heroic NPCs are mostly tall, muscly, and male.',
          'Villains have stereotypically "foreign" accents.',
          'A female character is the strongest fighter in the game.'
        ]
      },
      {
        type: 'fillblanks',
        id: 'just-because',
        label: '4 · Write your own "Just because… doesn\'t mean…" line.',
        helper: 'Borrow a stereotype that bugs you. Push back on it.',
        template: 'Just because I am ___, doesn\'t mean I ___.'
      },
      {
        type: 'shorttext',
        id: 'avatar-sketch',
        label: '5 · If you were designing an avatar that BREAKS a stereotype, what would you change? Describe it in detail.',
        rows: 4
      },
      {
        type: 'truefalse',
        id: 'tf-no-harm',
        label: '6 · True or False: "Stereotypes in games and shows are harmless because they\'re fictional."',
        correct: false,
        helper: 'Hint: think about what kids learn from what they see repeatedly.'
      }
    ]
  },

  {
    id: 'sondras-story',
    title: "Sondra's Story",
    eyebrow: 'Grade 6 · Online Friendship',
    scribble: 'bystander → upstander',
    subtitle: 'When everyone watches, somebody has to step up.',
    grade: 6,
    topic: 'Online Friendship & Cyberbullying',
    content: [
      {
        type: 'instruction',
        kind: 'story',
        text:
          "Sondra is planning a birthday party. Her parents capped the guest list at 15. Two classmates who weren't invited — Jesse and Maya — start an anonymous group chat. They post things like:\n\n• \"Sondra is so not cool, idk why anyone would go to her filthy house.\"\n• \"I heard she's serving fruit instead of cake. Yuk.\"\n\nThey egg on the kids who WERE invited. When Sondra sees the messages, she tells her parents she's sick and thinks about cancelling the whole party."
      },
      {
        type: 'tag',
        id: 'roles',
        label: '1 · Tag each character with the role they play in this story.',
        items: ['Sondra', 'Jesse', 'Maya', 'A kid who saw the messages and said nothing', 'A kid who DM\'d Sondra to check on her'],
        categories: ['Target', 'Bully', 'Bystander', 'Upstander'],
        correct: [0, 1, 1, 2, 3]
      },
      {
        type: 'mcq',
        id: 'is-it-cb',
        label: '2 · Which of these is most clearly cyberbullying?',
        options: [
          'A friend roasting you in a group chat once, and you both laugh.',
          'A coordinated, anonymous, repeated attack designed to humiliate you.',
          'A teacher leaving you a strict comment on a school assignment.',
          'A classmate disagreeing with your opinion on a film.'
        ],
        correct: 1
      },
      {
        type: 'rank',
        id: 'upstander',
        label: '3 · Rank these "upstander" moves from EASIEST to MOST COURAGEOUS.',
        topLabel: 'Easiest',
        bottomLabel: 'Most courageous',
        items: [
          'Not laugh at the messages.',
          'Privately DM Sondra to check on her.',
          'Tell a teacher what you saw.',
          'Reply in the group chat: "this isn\'t funny — leave her alone."',
          'Save screenshots and report the account.'
        ]
      },
      {
        type: 'shorttext',
        id: 'empathy',
        label: '4 · Why do you think Jesse and Maya did this? What were they trying to feel?',
        rows: 3,
        helper: 'Empathy probe: this is NOT about excusing them. It\'s about understanding how bullying gets started so we can stop it earlier.'
      },
      {
        type: 'shorttext',
        id: 'next-five',
        label: '5 · You\'re Sondra\'s friend. You see the messages. Type the very first thing you do in the next 5 minutes.',
        rows: 2
      },
      {
        type: 'truefalse',
        id: 'tf-anon',
        label: '6 · True or False: "If the app is anonymous, no one will ever find out who sent it."',
        correct: false
      }
    ]
  },

  /* ============================== GRADE 7 ============================== */

  {
    id: 'phishing',
    title: "Don't Feed the Phish",
    eyebrow: 'Grade 7 · Online Safety',
    scribble: '7 clues. read them slowly.',
    subtitle: 'Phishing weaponises urgency, fear, curiosity, and "too good to be true."',
    grade: 7,
    topic: 'Online Safety & Identity',
    content: [
      {
        type: 'richtext',
        text:
          'A **phishing** message pretends to be from someone you trust (a bank, a school, Apple, your auntie) so you click a link or hand over a piece of you (a password, a code, an SSN). It is the #1 way identities get stolen.\n\nThe seven classic phishing clues are: **urgency**, **threats / fear**, **too-good-to-be-true offers**, **awkward grammar**, **shortened or weird URLs**, **generic greetings**, and **requests for private info**.'
      },
      {
        type: 'match',
        id: 'clue-defs',
        label: '1 · Match each clue with what it actually looks like.',
        leftItems: ['Urgency', 'Threat / fear', 'Too good to be true', 'Bad grammar', 'Weird URL', 'Generic greeting', 'Asks for private info'],
        rightItems: [
          '"Act in the next 10 minutes or…"',
          '"Your account will be deleted forever."',
          '"You won an iPhone — confirm to claim!"',
          '"Pls verify ur acount immediatley."',
          'apple-secure-login.something-else.ru',
          '"Dear Customer," instead of your name.',
          '"Send your password to confirm it\'s you."'
        ],
        correct: [0, 1, 2, 3, 4, 5, 6]
      },
      {
        type: 'hotspot',
        id: 'spot-message',
        label: '2 · Tap every phishing clue in this message.',
        helper: 'Hint: there are at least four.',
        passage:
          "From: Aple Suport <support@apple-secure-login.ru>\nTo: customer\n\n{{0}}, your iCloud {{1}}. {{2}} by clicking {{3}} and entering your password.",
        spans: ['Dear Customer', 'WILL BE DELETED IN 24 HOURS', 'Pls verify ur identty', 'this link'],
        correct: [0, 1, 2, 3]
      },
      {
        type: 'multiselect',
        id: 'hooks',
        label: '3 · For the message above, which hooks is the scammer pulling on?',
        options: ['Greed', 'Fear', 'Urgency', 'Curiosity', 'Embarrassment'],
        correct: [1, 2]
      },
      {
        type: 'mcq',
        id: 'safe-click',
        label: '4 · Which of these is most likely SAFE to click?',
        options: [
          '"Mari_Tellez sent you a class photo: bit.ly/xz9k"',
          '"Your school posted today\'s timetable on classroom.school.hu (you\'re logged in already)."',
          '"You\'ve been chosen for a $1,000 gift card. Verify your IBAN now!"',
          '"Last warning: confirm your password or lose your account."'
        ],
        correct: 1
      },
      {
        type: 'rank',
        id: 'rank-msgs',
        label: '5 · Rank these from MOST to LEAST suspicious.',
        topLabel: 'Most suspicious',
        bottomLabel: 'Least suspicious',
        items: [
          'A DM that says "ur account will be banned, click 2 verify"',
          'An email from your dad you can read offline.',
          'A text from "Bank-Hungary": "Tap here in next 5 min or lose account."',
          'A push from your school\'s app about a new grade.'
        ]
      },
      {
        type: 'shorttext',
        id: 'next-move',
        label: '6 · You receive a message: "Hi, this is Apple Support. Reply with your Apple ID password to keep your photos." Type your actual next move.',
        rows: 3
      }
    ]
  },

  {
    id: 'red-flag-feelings',
    title: 'Red Flag Feelings',
    eyebrow: 'Grade 7 · Online Safety',
    scribble: 'when it feels off, it IS off',
    subtitle: 'A risky chat, four steps, no panic.',
    grade: 7,
    topic: 'Online Safety & Identity',
    content: [
      {
        type: 'instruction',
        kind: 'task',
        text:
          'Before you read: the "Feelings & Options" routine has four moves — IDENTIFY (who & what), FEEL (what\'s your gut saying?), IMAGINE (what could happen next?), SAY (what will you actually do?).'
      },
      {
        type: 'scenario',
        id: 'sara',
        title: 'Sara & alex_eastwest13',
        story:
          'Sara loves photography and posts her work on Instagram. A user named alex_eastwest13 starts liking and praising her photos. He DMs her asking if she wants to be a pro one day. They chat almost every day. Then alex_eastwest13 writes: "i think u r beautiful — could u send more selfies?" and shares a private number, with: "Just don\'t tell anyone I gave you this."',
        questions: [
          {
            type: 'multiselect',
            id: 'red-flags',
            label: '1 · Which of these are red flags in alex_eastwest13\'s behaviour?',
            options: [
              'Gives very specific compliments quickly.',
              'Likes Sara\'s photos.',
              'Asks for selfies.',
              'Shares a private number on the side.',
              'Says "don\'t tell anyone I gave you this."',
              'Talks about photography.'
            ],
            correct: [0, 2, 3, 4]
          },
          {
            type: 'shorttext',
            id: 'feel',
            label: '2 · FEEL · What\'s Sara probably feeling? Pick at least two emotions and explain.',
            rows: 3
          },
          {
            type: 'mcq',
            id: 'first-action',
            label: '3 · IMAGINE → SAY · Best FIRST move?',
            options: [
              'Send the selfie. He\'s been nice and might post about her work.',
              'Reply: "haha okay" and hope it goes away.',
              'Stop replying, screenshot the chat, tell a parent or trusted adult, and block.',
              'Confront him in public comments.'
            ],
            correct: 2
          },
          {
            type: 'shorttext',
            id: 'message',
            label: '4 · SAY · Type the actual message Sara should send (or "I\'d say nothing because…").',
            rows: 2
          }
        ]
      },
      {
        type: 'rank',
        id: 'rank-options',
        label: '5 · Rank these responses from SAFEST to RISKIEST.',
        topLabel: 'Safest',
        bottomLabel: 'Riskiest',
        items: [
          'Block + tell a trusted adult.',
          'Tell a friend you trust IRL, decide together.',
          'Reply once politely declining.',
          'Send the selfie — but only one.',
          'Send the selfie AND your phone number.'
        ]
      },
      {
        type: 'truefalse',
        id: 'tf-secret',
        label: '6 · True or False: When someone online says "don\'t tell anyone," that is itself a red flag.',
        correct: true
      }
    ]
  },

  {
    id: 'filter-bubble',
    title: 'Escape the Filter Bubble',
    eyebrow: 'Grade 7 · Critical Thinking',
    scribble: 'the algorithm is a mirror, not a window',
    subtitle: 'Algorithms learn what you like, then quietly narrow your world.',
    grade: 7,
    topic: 'Critical Thinking',
    content: [
      {
        type: 'richtext',
        text:
          'An **algorithm** is a set of rules an app uses to decide what to show you next. It watches what you click, like, and (especially) how long you stop scrolling — and then feeds you more of the same to keep you watching. Over time, your feed becomes a **filter bubble**: a small, comfortable space where you only see ideas you already agree with.'
      },
      {
        type: 'shorttext',
        id: 'bubble-story',
        label: '1 · Describe a time you felt stuck in a filter bubble. What was the bubble about? What told you you were inside one?',
        rows: 3
      },
      {
        type: 'multiselect',
        id: 'signals',
        label: '2 · Which signals do platforms like TikTok and Instagram track to build your "for you" feed? (Pick all that apply.)',
        options: [
          'How long you watch a video.',
          'How fast you scroll past something.',
          'What you type in the comments.',
          'What you DM to friends.',
          'Posts you re-watch.',
          'Whether you screenshot a post.',
          'Your favourite colour.'
        ],
        correct: [0, 1, 2, 3, 4, 5]
      },
      {
        type: 'truefalse',
        id: 'tf-neutral',
        label: '3 · True or False: "The algorithm shows me everything happening — it\'s neutral."',
        correct: false
      },
      {
        type: 'rank',
        id: 'pop-bubble',
        label: '4 · Rank these strategies for popping your bubble, from MOST to LEAST effective.',
        topLabel: 'Most effective',
        bottomLabel: 'Least effective',
        items: [
          'Follow people whose opinions you disagree with.',
          'Search for the topic on a different platform on purpose.',
          'Tap "not interested" on posts that look like more of the same.',
          'Read longer than 60 seconds on a single article.',
          'Just scroll faster.'
        ]
      },
      {
        type: 'mcq',
        id: 'why-dangerous',
        label: '5 · Why is being stuck in a filter bubble dangerous when you\'re trying to learn about a news event?',
        options: [
          'It\'s not — more of what you like is good.',
          'You only get one side of the story, and you start thinking everyone agrees.',
          'It costs more data.',
          'It tells your friends what you watch.'
        ],
        correct: 1
      },
      {
        type: 'shorttext',
        id: 'five-keywords',
        label: '6 · List FIVE keywords that describe your current feed. Be honest.',
        rows: 2,
        helper: 'There is no right answer; the list is the assignment.'
      }
    ]
  },

  /* ============================== GRADE 8 ============================== */

  {
    id: 'sift-deepfakes',
    title: 'SIFT: Fact-Checking & Deepfakes',
    eyebrow: 'Grade 8 · News & Misinformation',
    scribble: 'stop. investigate. find. trace.',
    subtitle: 'A 4-move routine for any post that hits you in the gut.',
    grade: 8,
    topic: 'News & Misinformation',
    content: [
      {
        type: 'richtext',
        text:
          '**SIFT** — a fact-checking routine you can do in under a minute.\n\n**S — Stop.** If your stomach reacts before your brain does, that\'s a red flag. Don\'t share yet.\n**I — Investigate the source.** Open a new tab. Who posted this? Who funds them?\n**F — Find better coverage.** Are real outlets (BBC, AP, Reuters, etc.) reporting the same thing?\n**T — Trace it back.** Who posted the original photo / video / quote? In what context?'
      },
      {
        type: 'match',
        id: 'sift-match',
        label: '1 · Match each SIFT letter with what it actually looks like.',
        leftItems: ['S — Stop', 'I — Investigate the source', 'F — Find better coverage', 'T — Trace to original'],
        rightItems: [
          'Notice your emotion before you click "share."',
          'Open a new tab and search who runs this site.',
          'Search keywords in Google News and read 3 different outlets.',
          'Reverse-image-search the photo to see when and where it actually appeared.'
        ],
        correct: [0, 1, 2, 3]
      },
      {
        type: 'scenario',
        id: 'principal',
        title: 'Viral TikTok',
        story:
          'A TikTok shows your school principal saying classes are cancelled forever. The clip has 280k views in three hours. The audio is a little glitchy and the lighting on the principal\'s face is weirdly even.',
        questions: [
          {
            type: 'mcq',
            id: 'first-step',
            label: 'Which SIFT step do you reach for FIRST?',
            options: ['S — Stop', 'I — Investigate', 'F — Find better coverage', 'T — Trace original'],
            correct: 0
          },
          {
            type: 'shorttext',
            id: 'what-do',
            label: 'In your own words: what do you actually DO before sharing?',
            rows: 3
          }
        ]
      },
      {
        type: 'multiselect',
        id: 'deepfake-tells',
        label: '2 · Which of these often give away an AI-generated photo or video?',
        options: [
          'Hands with too many fingers or weirdly bent thumbs.',
          'Lighting on the face that doesn\'t match the room.',
          'Audio out of sync with mouth movements.',
          'A real watermark from a known agency.',
          'Teeth that look slightly blurry.',
          'A timestamp visible on the original tweet you can verify.',
          'The reflection in the eyes doesn\'t match.'
        ],
        correct: [0, 1, 2, 4, 6]
      },
      {
        type: 'rank',
        id: 'sources-trust',
        label: '3 · Rank these sources from LEAST to MOST trustworthy for a breaking story.',
        topLabel: 'Least trustworthy',
        bottomLabel: 'Most trustworthy',
        items: [
          'A random TikTok with no source.',
          'A friend who heard it from their cousin.',
          'A live press conference video on a known network.',
          'A short article from Reuters with named reporters.',
          'A blog post citing other blog posts.'
        ]
      },
      {
        type: 'truefalse',
        id: 'tf-emotion',
        label: '4 · True or False: "If a post made you furious, you should share it immediately."',
        correct: false
      },
      {
        type: 'shorttext',
        id: 'why-fakes',
        label: '5 · Give TWO reasons people make deepfakes or fake news in the first place.',
        rows: 3
      }
    ]
  },

  {
    id: 'habits-checkup',
    title: 'Digital Habits Checkup',
    eyebrow: 'Grade 8 · Digital Wellbeing',
    scribble: 'check · choose · challenge · boost',
    subtitle: 'Audit one habit. Replace it on purpose.',
    grade: 8,
    topic: 'Digital Wellbeing',
    content: [
      {
        type: 'instruction',
        kind: 'tip',
        text: 'A habit is something you do without deciding. We\'re going to build a 4-step plan: Check (what is it?), Choose (which one to change), Challenge (replacement), Boost (make it stick).'
      },
      {
        type: 'shorttext',
        id: 'check',
        label: '1 · CHECK · List 5 of your current digital habits. Mix the good and the not-so-good.',
        rows: 3
      },
      {
        type: 'tag',
        id: 'tag-feel',
        label: '2 · For each habit, drop a feeling next to it.',
        items: ['Habit 1', 'Habit 2', 'Habit 3', 'Habit 4', 'Habit 5'],
        categories: ['Energising 😀', 'Neutral 😐', 'Drains me 😬'],
        helper: 'Match the rows to the order you wrote them above.'
      },
      {
        type: 'shorttext',
        id: 'choose',
        label: '3 · CHOOSE · Pick ONE habit you want to change. Why this one and not the others?',
        rows: 2
      },
      {
        type: 'mcq',
        id: 'red-flag-feeling',
        label: '4 · Which feeling is the strongest "red flag" worth listening to AFTER you use a device?',
        options: [
          'A little bored.',
          'Wired but tired, with a low feeling in your chest.',
          'Hungry.',
          'Curious about a new topic.'
        ],
        correct: 1
      },
      {
        type: 'shorttext',
        id: 'challenge',
        label: '5 · CHALLENGE · What will you do INSTEAD of that habit? When? For how long?',
        rows: 3,
        helper: 'Naming a replacement is the move that makes the change stick.'
      },
      {
        type: 'shorttext',
        id: 'boost',
        label: '6 · BOOST · Name two specific things that will make your new habit easier (e.g., charge the phone in another room).',
        rows: 2
      },
      {
        type: 'truefalse',
        id: 'tf-unplug',
        label: '7 · True or False: "Unplugging always means turning the phone off completely."',
        correct: false
      }
    ]
  },

  {
    id: 'taking-the-lead',
    title: 'Taking the Lead',
    eyebrow: 'Grade 8 · Online Friendship',
    scribble: 'de-escalation is a skill',
    subtitle: 'Digital drama spreads faster, lasts longer, and pulls in more people.',
    grade: 8,
    topic: 'Online Friendship & Cyberbullying',
    content: [
      {
        type: 'instruction',
        kind: 'story',
        text:
          'Felicia and Jen both auditioned for the lead in the school play. The next day, Mr. Adler posts the cast list. Felicia gets the lead. She posts a screenshot to social media: "Guess who made LEAD ROLE!! ME!" People start replying with #teamjen and #teamfelicia. Jayden posts: "she only got it because Mr. Adler likes her." Felicia replies by posting an embarrassing picture of Jayden and a screenshot of him failing a test.'
      },
      {
        type: 'tag',
        id: 'tag-comments',
        label: '1 · Tag each comment in the thread.',
        items: [
          '"Congrats girl!! 💖"',
          '"#teamjen forever, this is so unfair"',
          '"she only got it because Mr. Adler likes her."',
          '[Felicia\'s clapback with Jayden\'s failing grade]',
          '"hey guys can we tone it down a bit"'
        ],
        categories: ['Fuel', 'Neutral', 'De-escalator'],
        correct: [1, 0, 0, 0, 2]
      },
      {
        type: 'rank',
        id: 'rank-deesc',
        label: '2 · Rank these moves from BEST to WORST at de-escalating drama.',
        topLabel: 'Best at de-escalating',
        bottomLabel: 'Worst',
        items: [
          'DM the person directly to talk it out, no screenshots.',
          'Post a public reply calling the other person stupid.',
          'Save screenshots, tell a teacher, stop replying publicly.',
          'Repost the screenshots to your story for revenge.',
          'Take a break from the app for 24 hours.'
        ]
      },
      {
        type: 'mcq',
        id: 'mcq-counter',
        label: '3 · Felicia is angry — Jayden\'s comment was unfair. Which of these counter-moves makes the drama worse?',
        options: [
          'Letting it sit and replying tomorrow when she\'s calm.',
          'Telling Mr. Adler privately how she\'s feeling.',
          'Posting Jayden\'s failing-grade screenshot publicly.',
          'Asking a friend to read her draft reply before sending.'
        ],
        correct: 2
      },
      {
        type: 'scenario',
        id: 'perspective',
        title: 'Pick a perspective',
        story: 'Pick ONE person from the scenario (Felicia, Jen, Jayden, Mr. Adler, or a friend who saw the post). You are going to walk through the scene from inside their head.',
        questions: [
          {
            type: 'shorttext',
            id: 'whoami',
            label: 'I am taking the perspective of __ . Why I acted the way I did:',
            rows: 2
          },
          {
            type: 'shorttext',
            id: 'differently',
            label: 'One thing I could have done differently — and what stopped me from doing it the first time:',
            rows: 3
          }
        ]
      },
      {
        type: 'multiselect',
        id: 'why-online-worse',
        label: '4 · Why does drama online tend to be worse than the same drama in person? (Pick all that apply.)',
        options: [
          'It can\'t be deleted from other people\'s screens once it\'s shared.',
          'You can\'t see the other person\'s face.',
          'Hundreds of people see it, not just the people involved.',
          'It happens slower, so you can take your time.',
          'You can read it again and again at 2 a.m.'
        ],
        correct: [0, 1, 2, 4]
      },
      {
        type: 'shorttext',
        id: 'mr-adler',
        label: '5 · If you were Mr. Adler — and you saw all of this on Sunday night — what would you do before Monday morning?',
        rows: 3
      }
    ]
  }
];

export const TOPICS = [
  'News & Misinformation',
  'Online Safety & Identity',
  'Digital Wellbeing',
  'Online Friendship & Cyberbullying',
  'Stereotypes & Representation',
  'Critical Thinking',
];

export const GRADES = [5, 6, 7, 8];
