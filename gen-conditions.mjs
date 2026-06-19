import { writeFileSync, mkdirSync } from 'fs';
mkdirSync('conditions', { recursive: true });

const WA = 'https://wa.me/917838778825?text=Hello%20AAKAR%20%2C%20I%20would%20like%20to%20schedule%20an%20assessment%20and%20learn%20more%20about%20the%20support%20services%20available%20for%20my%20child';

/* shared therapy library */
const T = {
  speech: { ic:'💬', t:'Speech &amp; Language Therapy', w:'Building the skills to understand language and to express wants, needs, thoughts and feelings — through sounds, words, signs or devices.', h:'Turns frustration into communication and helps your child connect with the people they love.', s:'Play-based games, picture cards, turn-taking and modelling — gentle practice that rarely feels like "work".' },
  ot: { ic:'🖐️', t:'Occupational Therapy', w:'Supporting the everyday "occupations" of childhood — play, self-care, handwriting, focus and sensory regulation.', h:'Builds independence, motor skills and the confidence to take part in daily life.', s:'Obstacle courses, fine-motor crafts, sensory activities and calming strategies tailored to your child.' },
  physio: { ic:'🤸', t:'Physiotherapy', w:'Developing strength, balance, posture and coordination so the body can keep up with a child\'s curiosity.', h:'Makes movement, play and everyday activities easier, safer and more joyful.', s:'Active, playful movement — climbing, balancing and games that build big-muscle skills.' },
  sensory: { ic:'🌈', t:'Sensory Integration', w:'Helping the nervous system make sense of sound, touch, movement and light so the world feels manageable.', h:'Brings calm and focus to children who feel overwhelmed or under-stimulated.', s:'Swings, textures, deep-pressure play and a "sensory diet" your child genuinely enjoys.' },
  behaviour: { ic:'🧩', t:'Behaviour Support', w:'Understanding behaviour as communication, and building emotional regulation, attention, routines and positive habits.', h:'Develops coping skills and reduces stress — for your child and your whole family.', s:'Predictable routines, visual supports, praise for effort and strategies you can use at home.' },
  special: { ic:'📚', t:'Special Education', w:'Structured, multisensory teaching matched to how your child learns best — at their own pace.', h:'Opens a different doorway into reading, writing, maths and learning to love learning.', s:'Small-group or one-to-one sessions using hands-on, multisensory methods.' },
  social: { ic:'🧒', t:'Social Skills Training', w:'Rehearsing the unwritten rules of friendship — sharing, turn-taking, reading faces and joining play.', h:'Helps your child feel at home in a room full of children.', s:'Small guided groups where social moments are practised through games and play.' },
  counselling: { ic:'💚', t:'Psychological Counselling', w:'A safe, warm space for children and parents to understand big feelings and find new ways to cope.', h:'Supports emotional wellbeing, confidence and resilience.', s:'Talk, play and creative activities, plus practical guidance for parents.' },
  parent: { ic:'👨‍👩‍👧', t:'Parent Coaching', w:'Equipping you with simple, doable strategies so progress continues between sessions, at home.', h:'Makes you a confident partner in your child\'s growth — never a spectator.', s:'Short, practical coaching woven around your family\'s real routines.' },
};

/* the AAKAR support journey is shared */
const JOURNEY = [
  { n:'01', t:'Parent Consultation', d:'We start by listening — to your concerns, your child\'s developmental story, and the goals that matter most to your family.' },
  { n:'02', t:'Comprehensive Assessment', d:'A gentle, play-based assessment to understand your child\'s strengths and support needs across communication, learning, behaviour and daily functioning.' },
  { n:'03', t:'Personalized Development Plan', d:'Individual goals shaped around your child and your family priorities — with school collaboration whenever it helps.' },
  { n:'04', t:'Therapy &amp; Intervention', d:'The right mix of support, delivered by a multidisciplinary team that works as one — so nothing happens in isolation.' },
  { n:'05', t:'Progress Reviews', d:'We track growth, refine goals together, and celebrate every milestone along the way.' },
];

const FAQ_COMMON = [
  { q:'Is early intervention really that important?', a:'Yes. A child\'s early years are a time of remarkable brain growth, and timely, gentle support can make a meaningful, lasting difference. That said, support helps at any age — it\'s never "too late" to begin.' },
  { q:'How long does therapy take?', a:'Every child is different, so there\'s no single answer. We set clear goals, review progress regularly, and are always honest about what we\'re seeing. The aim is always independence — not therapy for its own sake.' },
  { q:'How involved should I be as a parent?', a:'As involved as you\'d like to be — and we hope that\'s a lot. Parents are partners at AAKAR. We coach you with simple strategies so the progress made in sessions continues at home.' },
];

const CONDS = [
  {
    slug:'autism', name:'Autism Spectrum Disorder', ac:'#16A3AF', acd:'#0E7A84', tint:'#F0FBFB', hero:'gal-03.jpeg',
    intro:'Every child grows, learns and connects in their own way. If you\'ve been wondering whether your child may need additional support, you\'re not alone — and understanding their needs is the first hopeful step toward helping them thrive.',
    understand:[
      'Autism is a different way of experiencing the world — in how a child communicates, plays, relates to others and responds to sights, sounds and routines. It is a spectrum, which means no two autistic children are alike.',
      'Some children speak early and fluently; others communicate in different ways. Some seek out sensory experiences while others find them overwhelming. These differences shape how your child connects — they don\'t define their worth or their potential.',
      'With understanding and the right support, autistic children build communication, confidence and independence — while their unique strengths are celebrated, not "fixed".'
    ],
    signs:{
      home:'May prefer predictable routines and find unexpected changes upsetting.',
      play:'May line up or sort toys, or enjoy the same play in the same way.',
      comm:'May be slow to develop speech, or communicate in their own unique ways.',
      learn:'May have strong, deep interests and learn best through those passions.',
      social:'May find eye contact, sharing attention or joining play more difficult.',
      daily:'May be very sensitive — or under-responsive — to sounds, textures or light.'
    },
    strengths:['Remarkable attention to detail','Deep, passionate interests','Honest, genuine communication','Strong memory and pattern-spotting','Loyalty and a love of routine'],
    therapies:['speech','ot','sensory','behaviour','social','parent'],
    faq:[
      { q:'Will my child "grow out" of autism?', a:'Autism is a lifelong way of being — not an illness to outgrow. But with understanding and support, autistic children grow enormously in communication, independence and confidence, and go on to lead happy, meaningful lives.' },
      { q:'Can my child attend a mainstream school?', a:'Many autistic children thrive in mainstream settings with the right support, while others do best in more specialised environments. We help you understand what suits your child and can collaborate with their school.' },
      ...FAQ_COMMON
    ],
    resources:['Keep routines predictable and use simple visual schedules for the day.','Give a little extra time for your child to process what you\'ve said.','Follow your child\'s interests — they\'re a wonderful doorway into connection.','Create a calm, low-sensory corner where your child can reset when overwhelmed.']
  },
  {
    slug:'adhd', name:'ADHD &amp; Attention Difficulties', ac:'#ED1A5F', acd:'#C2134B', tint:'#FFF1F6', hero:'gal-07.jpg',
    intro:'If your child seems to have boundless energy, big ideas and a mind that races ahead, you know how wonderful — and how exhausting — that can be. Understanding attention is the first step toward channelling it.',
    understand:[
      'ADHD affects how a child regulates attention, activity and impulses. It isn\'t about a lack of effort or "naughtiness" — it\'s a difference in how the brain manages focus and self-control.',
      'It shows up differently in every child: some are constantly on the move, others daydream quietly, and many are a mix of both. With the right strategies, these children learn to harness their energy and creativity.',
      'Support focuses on practical skills — for focus, organisation and emotional regulation — alongside building the confidence that frequent correction can wear down.'
    ],
    signs:{
      home:'May find it hard to follow multi-step instructions or finish tasks.',
      play:'Bursting with energy — may move quickly from one activity to the next.',
      comm:'May interrupt, blurt out answers, or find waiting their turn hard.',
      learn:'May struggle to stay focused on one activity for long periods.',
      social:'May act before thinking, which can affect friendships.',
      daily:'Mornings, transitions and "getting ready" can feel like a daily battle.'
    },
    strengths:['Creativity and imagination','Boundless curiosity and energy','Spontaneity and enthusiasm','Out-of-the-box problem solving','Passion and hyper-focus on loved interests'],
    therapies:['behaviour','ot','counselling','special','parent'],
    faq:[
      { q:'Is ADHD caused by too much screen time or sugar?', a:'No. ADHD is a neurodevelopmental difference, not something caused by parenting, diet or screens. Healthy routines help everyone — but they don\'t cause or cure ADHD.' },
      { q:'Will my child be able to focus in school?', a:'With the right strategies and support, yes — many children with ADHD do well academically. We work on focus, organisation and self-regulation, and collaborate with schools on simple, effective adjustments.' },
      ...FAQ_COMMON
    ],
    resources:['Break tasks into small, clear steps and celebrate each one.','Use timers and visual checklists to make time feel concrete.','Build in movement breaks — energy out helps focus in.','Notice and name the good: praise for effort goes a long way.']
  },
  {
    slug:'speech-language-delay', name:'Speech &amp; Language Delay', ac:'#F58A1F', acd:'#B65F07', tint:'#FFF6EC', hero:'gal-08.jpg',
    intro:'Few things are harder than watching your child struggle to be understood. The good news: communication can be built, gently and steadily — and there is so much we can do together.',
    understand:[
      'A speech and language delay means a child is developing communication more slowly than expected. "Speech" is how clearly sounds are produced; "language" is understanding and using words and sentences.',
      'Some children understand far more than they can say; others need support with both. Difficulties can affect first words, clarity of speech, following instructions or putting sentences together.',
      'With early, playful support, most children make wonderful progress — moving from frustration to first words, and from first words to whole conversations.'
    ],
    signs:{
      home:'May use few words, or rely on pointing and gestures to be understood.',
      play:'May play quietly, with less of the "narrating" chatter you\'d expect.',
      comm:'Speech may be hard for unfamiliar people to understand.',
      learn:'May find it hard to follow simple spoken instructions.',
      social:'May get frustrated or withdraw when they can\'t get their message across.',
      daily:'May point or lead you by the hand rather than asking with words.'
    },
    strengths:['Strong understanding, even when expressing is hard','Expressive faces and gestures','Determination to be understood','Rich imagination in play','Warmth and connection beyond words'],
    therapies:['speech','ot','social','parent'],
    faq:[
      { q:'Should I just "wait and see" if my child catches up?', a:'Some late talkers do catch up — but it\'s impossible to know which children will without a proper look. A gentle assessment gives clarity, and early support is always easier than waiting and worrying.' },
      { q:'Will using gestures or pictures stop my child from talking?', a:'Quite the opposite. Tools like gestures, signs and pictures reduce frustration and actually support spoken language — they\'re a bridge to words, not a replacement.' },
      ...FAQ_COMMON
    ],
    resources:['Narrate daily life out loud — name what you see and do together.','Pause and wait expectantly; give your child time to respond.','Read together every day, following their lead on favourite books.','Repeat and gently expand: if they say "car", you say "yes, a fast red car!".']
  },
  {
    slug:'learning-disabilities', name:'Learning Disabilities', ac:'#7DB72C', acd:'#5E9018', tint:'#F4FBEA', hero:'gal-04.jpeg',
    intro:'A bright child who finds reading, writing or maths unexpectedly hard can leave everyone confused. A learning difference is not about intelligence — it\'s about finding the doorway that fits.',
    understand:[
      'Learning disabilities — such as dyslexia, dysgraphia and dyscalculia — affect specific skills like reading, writing or maths, while leaving overall intelligence intact.',
      'These children often work twice as hard for the same result, which can affect confidence. The key is teaching that matches how their brain learns best — usually structured, multisensory and paced for them.',
      'With the right approach, children with learning differences flourish — and many of the world\'s most creative thinkers learn exactly this way.'
    ],
    signs:{
      home:'Homework may take far longer than expected, with rising frustration.',
      play:'Strengths often shine in hands-on, creative or building play.',
      comm:'May explain ideas brilliantly out loud but struggle to write them down.',
      learn:'Difficulty with reading, spelling, writing or maths despite real effort.',
      social:'May avoid reading or writing tasks in front of friends.',
      daily:'May mix up left/right, sequences, or have trouble with time and organisation.'
    },
    strengths:['Visual and big-picture thinking','Creativity and original ideas','Strong problem-solving and innovation','Resilience and determination','Verbal storytelling and imagination'],
    therapies:['special','ot','counselling','parent'],
    faq:[
      { q:'Does a learning disability mean my child isn\'t intelligent?', a:'Not at all. Learning disabilities are specific — they affect particular skills, not overall ability. Many children with learning differences are highly intelligent and creative.' },
      { q:'Can my child still do well in school?', a:'Absolutely. With the right teaching methods and reasonable accommodations, children with learning differences succeed academically and rediscover their love of learning.' },
      ...FAQ_COMMON
    ],
    resources:['Lean into strengths — use drawing, building or talking to learn.','Break reading and writing into short, success-sized chunks.','Use multisensory tools: trace letters, build words, say sounds aloud.','Protect confidence — praise effort and progress, not just results.']
  },
  {
    slug:'developmental-delay', name:'Developmental Delay', ac:'#FFB300', acd:'#A86A00', tint:'#FFFAEC', hero:'gal-09.jpg',
    intro:'When milestones are slower to arrive, it\'s natural to feel uncertain. Reaching out isn\'t about labels — it\'s about understanding how to help your child catch their stride.',
    understand:[
      'Developmental delay means a child is reaching milestones — like sitting, walking, talking or playing — later than usual, in one area or several.',
      'Sometimes there\'s a clear reason; often there isn\'t. What matters most is not the label, but coordinated, early support across the areas where your child needs a helping hand.',
      'Because early years are a time of rapid growth, timely intervention can make a remarkable difference — helping children build skills, momentum and confidence.'
    ],
    signs:{
      home:'May reach milestones (sitting, walking, talking) later than peers.',
      play:'Play may be simpler or more repetitive than expected for their age.',
      comm:'May be slower to babble, use words or understand language.',
      learn:'May need more time and repetition to pick up new skills.',
      social:'May show less interest in interacting or imitating others.',
      daily:'May need more help with feeding, dressing or self-care than expected.'
    },
    strengths:['Steady, genuine progress with support','Joy in mastering new skills','Warm bonds with familiar people','Persistence and a willingness to try','Unique pace, unique personality'],
    therapies:['speech','ot','physio','special','parent'],
    faq:[
      { q:'Will my child catch up to their peers?', a:'Many children make excellent progress with early, coordinated support, and some catch up fully. Others move at their own pace — and that\'s okay. Our focus is steady growth and real-life skills.' },
      { q:'Why is a coordinated, multidisciplinary approach better?', a:'Development is connected — movement, communication and play all influence one another. A team working from one shared plan helps your child progress faster than therapies working in isolation.' },
      ...FAQ_COMMON
    ],
    resources:['Build skills through everyday play and daily routines.','Repeat little and often — short, frequent practice works best.','Celebrate small wins; they add up to big milestones.','Follow your child\'s lead and keep learning joyful and pressure-free.']
  },
  {
    slug:'sensory-processing', name:'Sensory Processing Challenges', ac:'#16A3AF', acd:'#0E7A84', tint:'#F0FBFB', hero:'gal-06.webp',
    intro:'If everyday sounds, textures or movement seem to overwhelm — or barely register for — your child, there\'s a gentle explanation, and there\'s real help. The world can feel manageable again.',
    understand:[
      'Sensory processing is how the brain takes in and responds to information from the senses. For some children, that information feels too intense; for others, not intense enough.',
      'A child who covers their ears at noise, avoids messy textures, or seeks constant movement may be working hard to feel comfortable and regulated in their body.',
      'With sensory integration support, children learn to find calm and focus — making daily life, learning and play far easier and more enjoyable.'
    ],
    signs:{
      home:'May be distressed by certain clothing textures, tags or food textures.',
      play:'May avoid messy play — or crave spinning, crashing and deep pressure.',
      comm:'May "shut down" or melt down when sensory input becomes too much.',
      learn:'May find it hard to sit still or focus in busy, noisy environments.',
      social:'Crowded or loud places (parties, malls) may feel overwhelming.',
      daily:'Haircuts, nail-cutting, teeth-brushing or bathing may be very hard.'
    },
    strengths:['Rich, vivid sensory awareness','Often highly creative and observant','Deep focus once comfortable','Strong preferences and self-knowledge','Calm and capable in the right environment'],
    therapies:['sensory','ot','behaviour','parent'],
    faq:[
      { q:'Is my child just being difficult or fussy?', a:'No. Sensory responses are real and involuntary — your child isn\'t choosing to react this way. Understanding the "why" turns frustration into compassion, for both of you.' },
      { q:'Can sensory needs improve over time?', a:'Yes. With sensory integration support and the right strategies at home, children learn to regulate more comfortably and participate more fully in everyday life.' },
      ...FAQ_COMMON
    ],
    resources:['Notice your child\'s triggers and "calmers" — and plan around them.','Offer a calm, low-sensory space to retreat and reset.','Use deep pressure (hugs, heavy blankets) for calming when welcomed.','Prepare for tricky moments (haircuts, parties) with warnings and tools.']
  },
  {
    slug:'social-communication', name:'Social Communication Difficulties', ac:'#2BC4D0', acd:'#0E8A94', tint:'#EAF9FA', hero:'gal-01.png',
    intro:'Friendship has a lot of unwritten rules. If your child finds connecting with others harder than you\'d expect, those rules can be learned — gently, and through play.',
    understand:[
      'Social communication is how we use language and cues to connect — taking turns, reading faces and tone, starting conversations and joining play.',
      'Some children understand words well but find the social "dance" tricky: knowing when to speak, how to read a friend\'s mood, or how to join a game already in progress.',
      'In small, guided groups, children rehearse these moments in a safe space — building the skills and confidence that make childhood social life joyful.'
    ],
    signs:{
      home:'May talk at length about favourite topics, with less back-and-forth.',
      play:'May find it hard to join others\' play or share imaginative games.',
      comm:'May miss tone, facial expressions or the "hidden" meaning in words.',
      learn:'Group work and unstructured times (like break) can be challenging.',
      social:'May want friends but find starting or keeping friendships hard.',
      daily:'May prefer routines and find unstructured social settings stressful.'
    },
    strengths:['Honesty and sincerity','Deep knowledge of loved topics','Loyalty as a friend','Fresh, original perspectives','Thrives with clear, kind structure'],
    therapies:['social','speech','counselling','parent'],
    faq:[
      { q:'Will my child ever make friends?', a:'Yes. Social skills can absolutely be learned and strengthened. With practice and support, children build genuine, lasting friendships — often deep and loyal ones.' },
      { q:'Should I push my child into more social situations?', a:'Gentle, supported steps work better than pressure. We help children build skills first, then practise them in small, friendly groups before bigger settings.' },
      ...FAQ_COMMON
    ],
    resources:['Role-play tricky social moments at home, playfully and pressure-free.','Set up short, structured playdates around a shared activity.','Name emotions in books and films to build "people-reading" skills.','Praise small social wins — a hello, a turn taken, a question asked.']
  },
  {
    slug:'behavioural-emotional', name:'Behavioural &amp; Emotional Regulation', ac:'#FFB300', acd:'#A86A00', tint:'#FFFAEC', hero:'gal-05.jpeg',
    intro:'Big feelings, meltdowns and worries can be hard for the whole family. Behaviour is communication — and with warmth and the right strategies, children learn to cope and grow.',
    understand:[
      'All children have big feelings; some need extra help to understand and manage them. Difficult behaviour is usually a child\'s way of saying "this is too much for me right now".',
      'Whether it\'s frequent meltdowns, anxiety, rigidity or anger, these are signals — not bad behaviour. The goal is to teach regulation and coping, never to shame.',
      'With understanding, predictable support and parent coaching, children build emotional skills that serve them for life — and homes become calmer, too.'
    ],
    signs:{
      home:'Frequent or intense meltdowns, often around transitions or "no".',
      play:'May become rigid about how play "must" go, finding flexibility hard.',
      comm:'May struggle to name feelings, expressing them through behaviour instead.',
      learn:'Worry, frustration or low mood may get in the way of learning.',
      social:'Conflicts with peers or siblings may be frequent or hard to recover from.',
      daily:'Everyday changes and routines can trigger big emotional reactions.'
    },
    strengths:['Deep, passionate feelings','Strong sense of fairness','Honesty about their inner world','Capacity for huge warmth and affection','Real growth once they feel safe and understood'],
    therapies:['behaviour','counselling','ot','parent'],
    faq:[
      { q:'Is my child\'s behaviour my fault?', a:'No. Behavioural and emotional differences are not caused by "bad parenting". You\'re clearly a caring parent — and with the right strategies, things genuinely get better for everyone.' },
      { q:'Will punishment help my child behave?', a:'Punishment rarely teaches the missing skill. We focus on understanding the "why", building regulation, and using warm, consistent strategies that actually work over time.' },
      ...FAQ_COMMON
    ],
    resources:['Stay calm and connect first — regulation is "caught" from calm adults.','Name feelings out loud to help your child understand them.','Keep routines predictable and warn ahead of transitions.','Notice and praise the calm, kind moments, not only the hard ones.']
  },
  {
    slug:'motor-coordination', name:'Motor &amp; Coordination', ac:'#ED1A5F', acd:'#C2134B', tint:'#FFF1F6', hero:'gal-06.webp',
    intro:'From holding a crayon to running in the playground, movement is the foundation of a child\'s confidence. When coordination is harder to come by, there\'s so much we can do to help.',
    understand:[
      'Motor and coordination difficulties affect how a child controls and coordinates their body — both big movements like running, jumping and balancing, and small ones like holding a pencil, using cutlery or doing up buttons.',
      'Some children seem clumsy or tire quickly; others avoid physical play or find handwriting exhausting. This isn\'t laziness — their muscles and movement-planning systems are simply working extra hard.',
      'With physiotherapy and occupational therapy, children build the strength, balance and coordination that everyday confidence is made of.'
    ],
    signs:{
      home:'May seem clumsy, bump into things, or trip and fall often.',
      play:'May avoid climbing frames, ball games or playground equipment.',
      comm:'May find tasks needing fine hand control — like drawing — frustrating.',
      learn:'Handwriting may be slow, effortful or hard to read.',
      social:'May hang back from active group play or sports with friends.',
      daily:'Dressing, using cutlery or doing up buttons may be challenging.'
    },
    strengths:['Determination and perseverance','Creative ways around challenges','Strengths in ideas, words or art','Empathy and patience','Real pride in hard-won progress'],
    therapies:['physio','ot','sensory','parent'],
    faq:[
      { q:'Is my child just clumsy or lazy?', a:'Neither. Coordination difficulties are real and physical — your child is often trying harder than others, not less. Understanding this changes how we support them.' },
      { q:'Will my child be able to play sports and keep up?', a:'With targeted support, most children make great gains in strength, balance and coordination — and many go on to enjoy sports and active play with real confidence.' },
      ...FAQ_COMMON
    ],
    resources:['Make practice playful — obstacle courses and balloon games build skills.','Break motor tasks into small steps and celebrate each one.','Strengthen little hands with playdough, threading and tearing paper.','Be patient with dressing and meals — allow extra, pressure-free time.']
  },
];

/* ---------- template ---------- */
const SIGN_META = [
  ['home','At Home','🏠'], ['play','During Play','🧸'], ['comm','Communication','💬'],
  ['learn','Learning','📖'], ['social','Social Interaction','🤝'], ['daily','Daily Activities','🌷'],
];
const hexA = (hex,a)=>{const h=hex.replace('#','');return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${a})`;};

function page(c){
  const plainName = c.name.replace(/&amp;/g,'&');
  const signs = SIGN_META.map(([k,label,ic])=>`
        <div class="cd-card cd-reveal"><div class="cd-card__ic">${ic}</div><h3>${label}</h3><p>${c.signs[k]}</p></div>`).join('');
  const strengths = c.strengths.map(s=>`<div class="cd-strength cd-reveal"><span>✦</span>${s}</div>`).join('\n        ');
  const journey = JOURNEY.map(j=>`
        <div class="cd-step cd-reveal"><div class="cd-step__n">${j.n}</div><div><h3>${j.t}</h3><p>${j.d}</p></div></div>`).join('');
  const therapies = c.therapies.map(key=>{const x=T[key];return `
        <div class="cd-therapy cd-reveal"><div class="cd-therapy__ic">${x.ic}</div><h3>${x.t}</h3><p class="cd-therapy__what">${x.w}</p><div class="cd-therapy__row"><strong>How it helps</strong>${x.h}</div><div class="cd-therapy__row"><strong>A session may look like</strong>${x.s}</div></div>`;}).join('');
  const faqs = c.faq.map(f=>`
        <details class="cd-faq cd-reveal"><summary>${f.q}<span class="cd-faq__plus">+</span></summary><div class="cd-faq__a">${f.a}</div></details>`).join('');
  const resources = c.resources.map(r=>`<div class="cd-tip cd-reveal"><span class="cd-tip__dot"></span>${r}</div>`).join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${plainName} · AAKAR Child Development Centre</title>
<meta name="description" content="${plainName}: a warm, parent-focused guide from AAKAR Child Development Centre — understanding, strengths, signs to notice, and how we support your child.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fredoka:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  :root{ --ac:${c.ac}; --acd:${c.acd}; --tint:${c.tint}; --acA:${hexA(c.ac,.14)}; }
  *{ box-sizing:border-box; }
  html,body{ margin:0; padding:0; }
  body{ background:#FDF7EF; font-family:'Plus Jakarta Sans',system-ui,sans-serif; color:#2B2535; -webkit-font-smoothing:antialiased; overflow-x:hidden; line-height:1.6; }
  a{ color:inherit; text-decoration:none; }
  ::selection{ background:var(--ac); color:#fff; }
  @keyframes ak-morph{ 0%,100%{ border-radius:42% 58% 63% 37% / 47% 42% 58% 53% } 50%{ border-radius:62% 38% 41% 59% / 56% 63% 37% 44% } }
  @keyframes ak-bob{ 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(-14px) } }
  @keyframes ak-pulse{ 0%{ transform:scale(1); opacity:.55 } 70%{ transform:scale(1.9); opacity:0 } 100%{ opacity:0 } }
  .cd-crayon{ font-family:'Caveat',cursive; font-weight:700; letter-spacing:.5px; }
  .cd-eyebrow{ font-weight:700; letter-spacing:3px; text-transform:uppercase; font-size:13px; color:var(--acd); margin-bottom:14px; }
  .cd-wrap{ max-width:1100px; margin:0 auto; }
  .cd-sec{ padding:clamp(50px,7vw,96px) clamp(20px,5vw,80px); position:relative; overflow:hidden; }
  .cd-h2{ font-family:'Fredoka',sans-serif; font-weight:600; font-size:clamp(1.8rem,4vw,2.9rem); line-height:1.08; margin:0 0 14px; }
  .cd-reveal{ opacity:0; transform:translateY(34px); transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
  .cd-reveal.in{ opacity:1; transform:none; }
  /* nav */
  nav{ position:sticky; top:0; z-index:50; display:flex; align-items:center; justify-content:space-between; padding:16px clamp(20px,4vw,56px); background:rgba(253,247,239,.88); backdrop-filter:blur(14px); box-shadow:0 4px 22px rgba(43,37,53,.06); }
  /* hero */
  .cd-hero{ background:radial-gradient(120% 100% at 18% 0%, var(--tint) 0%, #FFFDF8 55%, #FBF3E8 100%); }
  .cd-hero__grid{ display:grid; grid-template-columns:1.05fr .95fr; gap:clamp(34px,5vw,64px); align-items:center; }
  .cd-hero h1{ font-family:'Fredoka',sans-serif; font-weight:600; font-size:clamp(2.4rem,5.4vw,4rem); line-height:1.02; letter-spacing:-.5px; margin:0 0 18px; }
  .cd-hero p{ font-size:clamp(1.05rem,1.7vw,1.25rem); color:#5A5466; max-width:520px; margin:0 0 28px; }
  .cd-btn{ display:inline-flex; align-items:center; gap:9px; background:var(--ac); color:#fff; padding:15px 26px; border-radius:44px; font-weight:700; font-size:16px; box-shadow:0 14px 30px ${hexA(c.ac,.32)}; }
  .cd-btn.ghost{ background:rgba(255,255,255,.85); border:1.5px solid rgba(43,37,53,.12); color:#2B2535; box-shadow:none; }
  .cd-hero__img{ position:relative; justify-self:center; width:min(86vw,440px); }
  .cd-hero__img .blob1{ position:absolute; inset:-7% -9% -11% -7%; background:linear-gradient(135deg,var(--ac),${c.acd}); border-radius:46% 54% 60% 40% / 52% 44% 56% 48%; animation:ak-morph 11s ease-in-out infinite; box-shadow:0 36px 80px ${hexA(c.ac,.26)}; }
  .cd-hero__img .frame{ position:relative; aspect-ratio:1/1; border-radius:44% 56% 54% 46% / 47% 47% 53% 53%; overflow:hidden; box-shadow:0 24px 60px rgba(43,37,53,.22); border:6px solid #fff; }
  .cd-hero__img .frame img{ width:100%; height:100%; object-fit:cover; }
  /* understand */
  .cd-understand p{ font-size:1.08rem; color:#3A3446; margin:0 0 16px; max-width:820px; }
  .cd-callout{ margin-top:10px; background:var(--tint); border-left:5px solid var(--ac); border-radius:16px; padding:20px 24px; color:var(--acd); font-weight:600; max-width:820px; }
  /* signs */
  .cd-grid3{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
  .cd-card{ background:#fff; border-radius:20px; padding:24px; box-shadow:0 12px 30px rgba(43,37,53,.06); }
  .cd-card__ic{ font-size:26px; margin-bottom:10px; }
  .cd-card h3{ font-family:'Fredoka',sans-serif; font-weight:600; font-size:1.1rem; margin:0 0 6px; }
  .cd-card p{ color:#5A5466; margin:0; font-size:.97rem; }
  .cd-note{ display:inline-block; background:#fff; border:1px dashed var(--ac); color:var(--acd); font-weight:600; font-size:.9rem; padding:8px 16px; border-radius:30px; margin-top:22px; }
  /* strengths */
  .cd-strengths{ background:linear-gradient(135deg, var(--tint), #FFFDF8); }
  .cd-strength{ display:flex; align-items:center; gap:12px; background:#fff; border-radius:16px; padding:16px 20px; box-shadow:0 10px 26px rgba(43,37,53,.05); font-weight:600; color:#2B2535; }
  .cd-strength span{ color:var(--ac); font-size:18px; }
  .cd-strength-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:14px; max-width:820px; }
  /* journey */
  .cd-step{ display:flex; gap:18px; align-items:flex-start; background:#fff; border-radius:20px; padding:22px 24px; box-shadow:0 12px 30px rgba(43,37,53,.05); margin-bottom:14px; }
  .cd-step__n{ flex:none; width:48px; height:48px; border-radius:14px; background:var(--acA); color:var(--acd); font-family:'Fredoka',sans-serif; font-weight:700; font-size:18px; display:flex; align-items:center; justify-content:center; }
  .cd-step h3{ font-family:'Fredoka',sans-serif; font-weight:600; font-size:1.15rem; margin:2px 0 4px; }
  .cd-step p{ color:#5A5466; margin:0; }
  /* therapies */
  .cd-therapy{ background:#fff; border-radius:22px; padding:26px; box-shadow:0 14px 34px rgba(43,37,53,.07); border-top:5px solid var(--ac); }
  .cd-therapy__ic{ font-size:30px; }
  .cd-therapy h3{ font-family:'Fredoka',sans-serif; font-weight:600; font-size:1.2rem; margin:10px 0 8px; }
  .cd-therapy__what{ color:#5A5466; margin:0 0 14px; }
  .cd-therapy__row{ font-size:.94rem; color:#5A5466; margin-top:10px; }
  .cd-therapy__row strong{ display:block; color:var(--acd); font-size:.82rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:2px; }
  /* faq */
  .cd-faq{ background:#fff; border-radius:16px; box-shadow:0 10px 26px rgba(43,37,53,.05); margin-bottom:12px; overflow:hidden; }
  .cd-faq summary{ list-style:none; cursor:pointer; padding:20px 24px; font-family:'Fredoka',sans-serif; font-weight:600; font-size:1.08rem; display:flex; align-items:center; justify-content:space-between; gap:16px; }
  .cd-faq summary::-webkit-details-marker{ display:none; }
  .cd-faq__plus{ flex:none; width:30px; height:30px; border-radius:50%; background:var(--acA); color:var(--acd); display:flex; align-items:center; justify-content:center; font-size:20px; transition:transform .3s; }
  .cd-faq[open] .cd-faq__plus{ transform:rotate(45deg); }
  .cd-faq__a{ padding:0 24px 22px; color:#5A5466; }
  /* resources */
  .cd-tip{ display:flex; gap:12px; align-items:flex-start; background:#fff; border-radius:16px; padding:18px 20px; box-shadow:0 10px 26px rgba(43,37,53,.05); color:#3A3446; }
  .cd-tip__dot{ flex:none; width:12px; height:12px; border-radius:50%; background:var(--ac); margin-top:6px; }
  .cd-tip-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
  /* cta */
  .cd-cta{ background:radial-gradient(120% 100% at 50% 0%, var(--tint) 0%, #FFD7E6 60%, #CFE6FF 100%); text-align:center; }
  .cd-cta__box{ max-width:760px; margin:0 auto; }
  /* footer */
  footer{ background:#1C1726; color:#EDE8F0; padding:50px clamp(20px,5vw,80px); text-align:center; }
  @media (max-width:820px){ .cd-hero__grid{ grid-template-columns:1fr; } .cd-grid3{ grid-template-columns:1fr; } .cd-strength-grid,.cd-tip-grid{ grid-template-columns:1fr; } }
  @media (min-width:680px){ .cd-therapies-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:18px; } }
  .cd-therapies-grid{ display:flex; flex-direction:column; gap:18px; }
</style>
</head>
<body>

  <nav>
    <a href="index.html" style="display:flex; align-items:center; gap:12px;">
      <img src="images/aakar-emblem.png" alt="AAKAR" style="width:44px; height:44px; object-fit:contain;">
      <span style="font-family:'Fredoka',sans-serif; font-weight:700; font-size:25px; letter-spacing:.5px;"><span style="color:#16A3AF">A</span><span style="color:#ED1A5F">A</span><span style="color:#F58A1F">K</span><span style="color:#7DB72C">A</span><span style="color:#B57400">R</span></span>
    </a>
    <a href="index.html#ak-conditions" style="display:inline-flex; align-items:center; gap:8px; background:#fff; border:1px solid rgba(43,37,53,.1); color:#2B2535; padding:11px 20px; border-radius:40px; font-weight:700; font-size:14px;">← All conditions</a>
  </nav>

  <!-- 1. HERO -->
  <section class="cd-sec cd-hero">
    <div class="cd-wrap cd-hero__grid">
      <div class="cd-reveal">
        <div class="cd-eyebrow">Conditions &amp; needs we support</div>
        <h1>${c.name}</h1>
        <p>${c.intro}</p>
        <div style="display:flex; gap:14px; flex-wrap:wrap;">
          <a class="cd-btn" href="index.html#ak-contact">Book an assessment →</a>
          <a class="cd-btn ghost" href="${WA}" target="_blank" rel="noopener">Talk to AAKAR</a>
        </div>
      </div>
      <div class="cd-hero__img cd-reveal">
        <div class="blob1"></div>
        <div class="frame"><img src="images/${c.hero}" alt="A warm, welcoming space at AAKAR"></div>
        <div style="position:absolute; top:-12px; right:-6px; width:46px; height:46px; border-radius:50%; background:var(--ac); opacity:.9; animation:ak-bob 5s ease-in-out infinite;"></div>
      </div>
    </div>
  </section>

  <!-- 2. UNDERSTANDING -->
  <section class="cd-sec cd-understand" style="background:#FDF7EF;">
    <div class="cd-wrap">
      <div class="cd-reveal"><div class="cd-eyebrow">Understanding this</div><h2 class="cd-h2">What ${plainName.toLowerCase()} can mean</h2></div>
      ${c.understand.map(p=>`<p class="cd-reveal">${p}</p>`).join('\n      ')}
      <div class="cd-callout cd-reveal">Why early support helps: a child's early years are a time of rapid growth — gentle, timely support can make a meaningful, lasting difference. And it's never too late to begin.</div>
    </div>
  </section>

  <!-- 3. SIGNS -->
  <section class="cd-sec" style="background:linear-gradient(135deg,#FFFDF8,var(--tint));">
    <div class="cd-wrap">
      <div class="cd-reveal" style="text-align:center; margin-bottom:34px;"><div class="cd-eyebrow">Gentle observations</div><h2 class="cd-h2">Signs parents may notice</h2><p style="color:#5A5466; max-width:600px; margin:0 auto;">These are everyday observations that some parents notice — not a diagnosis. Every child is different, and only a proper assessment can give real answers.</p></div>
      <div class="cd-grid3">${signs}
      </div>
      <div style="text-align:center;"><span class="cd-note">If some of these feel familiar, a conversation is a kind next step — not a label.</span></div>
    </div>
  </section>

  <!-- 4. STRENGTHS -->
  <section class="cd-sec cd-strengths">
    <div class="cd-wrap">
      <div class="cd-reveal" style="margin-bottom:28px;"><div class="cd-eyebrow">The whole child</div><h2 class="cd-h2">Strengths we often see</h2><p style="color:#5A5466; max-width:620px;">A child is so much more than any challenge. These are gifts we so often celebrate in the children we work with.</p></div>
      <div class="cd-strength-grid">
        ${strengths}
      </div>
    </div>
  </section>

  <!-- 5. HOW AAKAR SUPPORTS -->
  <section class="cd-sec" style="background:#FDF7EF;">
    <div class="cd-wrap">
      <div class="cd-reveal" style="margin-bottom:30px;"><div class="cd-eyebrow">A partnership, step by step</div><h2 class="cd-h2">How AAKAR supports your child</h2><p style="color:#5A5466; max-width:640px;">We work alongside your family — never around you — with a plan built for your child alone.</p></div>
      ${journey}
    </div>
  </section>

  <!-- 6. THERAPIES -->
  <section class="cd-sec" style="background:linear-gradient(135deg,var(--tint),#FFFDF8);">
    <div class="cd-wrap">
      <div class="cd-reveal" style="margin-bottom:30px;"><div class="cd-eyebrow">Tailored to your child</div><h2 class="cd-h2">Therapies we may recommend</h2><p style="color:#5A5466; max-width:640px;">Every plan is individual. Depending on your child's needs, support may include:</p></div>
      <div class="cd-therapies-grid">${therapies}
      </div>
    </div>
  </section>

  <!-- 7. FAQ -->
  <section class="cd-sec" style="background:#FDF7EF;">
    <div class="cd-wrap" style="max-width:860px;">
      <div class="cd-reveal" style="text-align:center; margin-bottom:30px;"><div class="cd-eyebrow">You asked</div><h2 class="cd-h2">Parent questions, answered</h2></div>
      ${faqs}
    </div>
  </section>

  <!-- 8. RESOURCES -->
  <section class="cd-sec cd-strengths">
    <div class="cd-wrap">
      <div class="cd-reveal" style="margin-bottom:28px;"><div class="cd-eyebrow">For home</div><h2 class="cd-h2">Things you can try, today</h2><p style="color:#5A5466; max-width:620px;">Small, practical ideas to support your child between visits. Go gently — and follow your child's lead.</p></div>
      <div class="cd-tip-grid">
        ${resources}
      </div>
    </div>
  </section>

  <!-- 9. CTA -->
  <section class="cd-sec cd-cta">
    <div class="cd-cta__box cd-reveal">
      <h2 class="cd-crayon" style="font-size:clamp(2.2rem,5vw,3.6rem); line-height:1; margin:0 0 16px;">You know your child best.</h2>
      <p style="color:#5A5466; font-size:1.12rem; max-width:600px; margin:0 auto 26px;">If something feels different, seeking guidance isn't about finding a label — it's about understanding how to support your child's growth, with confidence. We'd love to help.</p>
      <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap;">
        <a class="cd-btn" href="index.html#ak-contact">Book an assessment →</a>
        <a class="cd-btn ghost" href="${WA}" target="_blank" rel="noopener">Contact AAKAR</a>
      </div>
    </div>
  </section>

  <footer>
    <div style="display:flex; align-items:center; justify-content:center; gap:11px; margin-bottom:14px;">
      <img src="images/aakar-emblem.png" alt="" style="width:42px; height:42px; object-fit:contain;">
      <span style="font-family:'Fredoka',sans-serif; font-weight:700; font-size:24px;"><span style="color:#2BC4D0">A</span><span style="color:#FF477E">A</span><span style="color:#FF9F43">K</span><span style="color:#9BD64A">A</span><span style="color:#FFD54F">R</span></span>
    </div>
    <p style="color:#B7AFC4; margin:0 0 8px;">Shaping every child's tomorrow.</p>
    <a href="index.html" style="color:#2BC4D0; font-weight:700;">← Back to home</a>
  </footer>

  <a href="${WA}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" style="position:fixed; bottom:24px; right:24px; z-index:80; width:60px; height:60px; border-radius:50%; background:#25D366; display:flex; align-items:center; justify-content:center; box-shadow:0 12px 30px rgba(37,211,102,.45);">
    <span style="position:absolute; inset:0; border-radius:50%; background:#25D366; animation:ak-pulse 2.4s ease-out infinite; z-index:-1;"></span>
    <svg width="31" height="31" viewBox="0 0 32 32" fill="#fff" aria-hidden="true"><path d="M16.04 4C9.93 4 4.98 8.95 4.98 15.06c0 1.96.51 3.87 1.49 5.56L4.8 27.2l6.74-1.64a11 11 0 0 0 4.5.96h.01c6.11 0 11.06-4.95 11.06-11.06C27.11 8.95 22.15 4 16.04 4Zm0 20.27h-.01a9.2 9.2 0 0 1-4.68-1.28l-.34-.2-3.49.85.93-3.4-.22-.35a9.16 9.16 0 0 1-1.41-4.9c0-5.07 4.13-9.2 9.21-9.2 2.46 0 4.77.96 6.5 2.7a9.13 9.13 0 0 1 2.7 6.51c0 5.08-4.13 9.21-9.2 9.21Zm5.05-6.89c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.38-.82-.74-1.38-1.65-1.54-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.41-.49.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.47-.62-.48l-.53-.01c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.3s.98 2.67 1.12 2.85c.14.18 1.94 2.96 4.7 4.15.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33Z"/></svg>
  </a>

<script>
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold:0.12, rootMargin:'0px 0px -6% 0px' });
  document.querySelectorAll('.cd-reveal').forEach(function(el){ io.observe(el); });
</script>
</body>
</html>
`;
}

// pages live in /conditions, so rewrite relative asset + internal links to ../
const fixPaths = (html) => html.replace(/(src|href)="(images\/|index\.html)/g, '$1="../$2');
CONDS.forEach(c => writeFileSync(`conditions/${c.slug}.html`, fixPaths(page(c))));
console.log('generated', CONDS.length, 'condition pages:', CONDS.map(c=>c.slug).join(', '));
