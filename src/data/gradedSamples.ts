/**
 * The graded homework samples on /grade ("See it grade").
 *
 * Every mark, score and comment below is copied from a real Matdo Grade result
 * (the app's GradeHistory/<id>/meta.json). Boxes are [x, y, width, height] as
 * fractions of the page image, origin top left; `src/lib/gradeMarks.ts` turns
 * them into the same positions the app draws. 
 *
 * To add a sample: put web-sized page images in public/demo/grade/, add an
 * entry here, and make sure no student name is visible in the image file itself.
 */

import type { Box } from "../lib/gradeMarks";

export type Mark = {
  n: string;
  result: "correct" | "incorrect";
  box: Box;
};

export type EssayNote =
  | { kind: "paragraph"; box: Box; index: number; isStrong: boolean; comment: string }
  | { kind: "spelling"; box: Box; issue: string; from: string; to: string };

export type Page = {
  src: string;
  width: number;
  height: number;
  /** Multi-page mode: read to grade the other pages against, not marked. */
  context?: boolean;
  /** The app's own banner when a graded question has no position on the page. */
  unmarked?: string;
  marks?: Mark[];
  essayNotes?: EssayNote[];
};

/** One row of the app's "Grading Details" sheet, in the app's own words. */
export type Row = {
  n: string;
  /** Which page (index into `pages`) the mark is on. */
  page: number;
  result: "correct" | "incorrect";
  student: string;
  correct: string;
  /** Shown after the answer, as the app does: "30 dimes". */
  unit?: string;
  explanation?: string;
  steps?: { text: string; math?: string }[];
  /** "At step N" in the app's Possible mistake panel; step 0 reads "Overall". */
  mistakes?: { step: number; detail: string }[];
  /** Graded, but the app could not place a mark for it on the page. */
  unmarked?: boolean;
};

export type Sample = {
  id: string;
  /** Under the thumbnail: the kind of homework. */
  label: string;
  title: string;
  /** The output level the app was set to, as the app names it. */
  mode: "Brief" | "Detailed" | "Essay Mode";
  seconds: number;
  alt: string;
  pages: Page[];
  /** Worksheets: the detail sheet's rows. */
  rows?: Row[];
  /** Essays: the detail sheet's prose and rubric. */
  essay?: {
    summary: string;
    rubric: { title: string; detail?: string; result: "Met" | "Partly met" | "Not met" }[];
    comment: string;
  };
};

export const samples: Sample[] = [
  {
    id: "math",
    label: "Calculation",
    title: "Adding positive and negative decimals",
    mode: "Detailed",
    seconds: 12,
    alt: "A handwritten page of decimal sums, questions 10 to 16, on lined paper.",
    pages: [
      {
        src: "/demo/grade/math-decimals.jpg", width: 840, height: 1000,
        marks: [
          { n: "10", result: "correct", box: [0.194, 0.091, 0.541, 0.087] },
          { n: "11", result: "correct", box: [0.256, 0.296, 0.118, 0.038] },
          { n: "12", result: "incorrect", box: [0.25, 0.43, 0.139, 0.036] },
          { n: "13", result: "correct", box: [0.244, 0.528, 0.064, 0.033] },
          { n: "14", result: "correct", box: [0.238, 0.622, 0.137, 0.036] },
          { n: "15", result: "correct", box: [0.256, 0.716, 0.119, 0.034] },
          { n: "16", result: "incorrect", box: [0.228, 0.851, 0.179, 0.032] },
        ],
      },
    ],
    rows: [
      { n: "10", page: 0, result: "correct", student: "−333, −23, −3.2, 0.32, 3.02", correct: "−333, −23, −3.2, 0.32, 3.02",
        explanation: "The values are correctly ordered from smallest to largest.",
        steps: [{ text: "Order the numbers from least to greatest.", math: "−333 < −23 < −3.2 < 0.32 < 3.02" }] },
      { n: "11", page: 0, result: "correct", student: "28.4", correct: "28.4",
        explanation: "The sum of −8.4 and 36.8 is correctly calculated as 28.4.",
        steps: [{ text: "Add the positive and negative decimals.", math: "−8.4 + 36.8 = 36.8 − 8.4 = 28.4" }] },
      { n: "12", page: 0, result: "incorrect", student: "−6.15", correct: "−6.42",
        explanation: "The student misaligned the decimal places when adding 0.3 and 0.12, arriving at −6.15 instead of −6.42.",
        steps: [{ text: "Add the two negative decimals.", math: "−6.3 + (−0.12) = −(6.30 + 0.12) = −6.42" }],
        mistakes: [{ step: 1, detail: "The student added 3 and 12 improperly to get 15 instead of aligning decimal places (0.30 + 0.12 = 0.42)." }] },
      { n: "13", page: 0, result: "correct", student: "0", correct: "0",
        explanation: "The sum of opposites is zero.",
        steps: [{ text: "Add opposite numbers.", math: "13.2 + (−13.2) = 0" }] },
      { n: "14", page: 0, result: "correct", student: "37.7", correct: "37.7",
        explanation: "The two decimals are correctly added together to get 37.7.",
        steps: [{ text: "Add the two positive decimals.", math: "14.6 + 23.1 = 37.7" }] },
      { n: "15", page: 0, result: "correct", student: "−11.5", correct: "−11.5",
        explanation: "Adding zero leaves the value unchanged at −11.5.",
        steps: [{ text: "Add negative 11.5 to zero.", math: "0 + (−11.5) = −11.5" }] },
      { n: "16", page: 0, result: "incorrect", student: "−15.06", correct: "−16.15",
        explanation: "The student incorrectly calculated −16.1 − 0.94 as −16.95 rather than −17.04.",
        steps: [
          { text: "Combine the negative terms first.", math: "−16.1 − 0.94 = −17.04" },
          { text: "Subtract from 0.89.", math: "0.89 − 17.04 = −16.15" },
        ],
        mistakes: [
          { step: 1, detail: "The student added 16.1 and 0.94 incorrectly as 16.95 instead of 17.04." },
          { step: 2, detail: "The student made an arithmetic error when evaluating 0.89 − 16.95." },
        ] },
    ],
  },
  {
    id: "sprint",
    label: "Short answer",
    title: "MATHCOUNTS Sprint Round, problems 1–6",
    mode: "Detailed",
    seconds: 10,
    alt: "A MATHCOUNTS Sprint Round page, problems 1 to 6, with handwritten answers in the blanks and working beside each problem.",
    pages: [
      {
        src: "/demo/grade/mathcounts-sprint.jpg", width: 825, height: 1100,
        marks: [
          { n: "1", result: "correct", box: [0.118, 0.07, 0.052, 0.035] },
          { n: "2", result: "correct", box: [0.142, 0.218, 0.088, 0.038] },
          { n: "3", result: "correct", box: [0.133, 0.342, 0.075, 0.041] },
          { n: "4", result: "correct", box: [0.122, 0.472, 0.066, 0.034] },
          { n: "5", result: "incorrect", box: [0.13, 0.64, 0.058, 0.037] },
          { n: "6", result: "correct", box: [0.159, 0.751, 0.037, 0.038] },
        ],
      },
    ],
    rows: [
      { n: "1", page: 0, result: "correct", student: "5", correct: "5", unit: "°C",
        explanation: "The thermometer reads at 5 degrees Celsius.",
        steps: [{ text: "Observe the thermometer level, which is halfway between 4 and 6.", math: "(4 + 6) / 2 = 5" }] },
      { n: "2", page: 0, result: "correct", student: "1600", correct: "1600", unit: "$",
        explanation: "Multiplying 20 hours by 8 weeks by $10 per hour gives $1600.",
        steps: [
          { text: "Multiply weekly hours by the number of weeks to find total hours.", math: "20 × 8 = 160" },
          { text: "Multiply total hours by the hourly rate.", math: "160 × 10 = 1600" },
        ] },
      { n: "3", page: 0, result: "correct", student: "24", correct: "24",
        explanation: "Dividing 21 by 7/8 yields 24.",
        steps: [{ text: "Divide 21 by 7/8 by multiplying by the reciprocal.", math: "21 × 8/7 = 3 × 8 = 24" }] },
      { n: "4", page: 0, result: "correct", student: "40", correct: "40", unit: "percent",
        explanation: "The categories for 6–10 and 11–15 years total 40 teachers, which is 40 percent of 100.",
        steps: [
          { text: "Read the number of teachers in the 6–10 and 11–15 year categories from the graph.", math: "25 + 15 = 40" },
          { text: "Calculate the percentage out of the 100 total teachers.", math: "40 / 100 × 100 = 40" },
        ] },
      { n: "5", page: 0, result: "incorrect", student: "28", correct: "−29",
        explanation: "Applying the operation sequentially gives −4 ☺ 7 = −29.",
        steps: [
          { text: "Evaluate the operation inside parentheses using the definition a ☺ b = 2a − 3b.", math: "1 ☺ 2 = 2(1) − 3(2) = 2 − 6 = −4" },
          { text: "Apply the operation to the result and 7.", math: "−4 ☺ 7 = 2(−4) − 3(7) = −8 − 21 = −29" },
        ],
        mistakes: [{ step: 2, detail: "The student treated the operation as multiplication of differences rather than applying the defined operation again." }] },
      { n: "6", page: 0, result: "correct", student: "7", correct: "7",
        explanation: "Simplifying 8/14 gives 4/7, so d = 7.",
        steps: [{ text: "Cross-multiply or simplify the fraction 8/14 to 4/7 to solve for d.", math: "8/14 = 4/7  →  d = 7" }] },
    ],
  },
  {
    id: "target",
    label: "Word problems",
    title: "MATHCOUNTS Target Round, problems 1–4",
    mode: "Detailed",
    seconds: 9,
    alt: "Two MATHCOUNTS Target Round pages, problems 1 to 4, with diagrams and long working drawn around each problem.",
    pages: [
      {
        src: "/demo/grade/mathcounts-target-p1.jpg", width: 825, height: 1100,
        marks: [
          { n: "1", result: "correct", box: [0.154, 0.088, 0.06, 0.027] },
          { n: "2", result: "correct", box: [0.207, 0.482, 0.06, 0.05] },
        ],
      },
      {
        src: "/demo/grade/mathcounts-target-p2.jpg", width: 825, height: 1100,
        marks: [
          { n: "3", result: "correct", box: [0.157, 0.089, 0.035, 0.028] },
          { n: "4", result: "incorrect", box: [0.157, 0.461, 0.092, 0.055] },
        ],
      },
    ],
    rows: [
      { n: "1", page: 0, result: "correct", student: "30", correct: "30", unit: "dimes",
        explanation: "The system of linear equations correctly yields 30 dimes.",
        steps: [
          { text: "Set up an equation where d is the number of dimes and d + 6 is the number of quarters.", math: "0.10d + 0.25(d + 6) = 12.00" },
          { text: "Distribute and simplify the equation.", math: "0.35d + 1.50 = 12.00" },
          { text: "Solve for d.", math: "0.35d = 10.50  ⟹  d = 30" },
        ] },
      { n: "2", page: 0, result: "correct", student: "10", correct: "10", unit: "day",
        explanation: "Doubling every two days reaches 16 inches on day 10.",
        steps: [
          { text: "Track the height on even days starting with day 2 at 1 inch.", math: "Day 2: 1 in" },
          { text: "Double the height every two days until 16 inches is reached.", math: "Day 4: 2 in, Day 6: 4 in, Day 8: 8 in, Day 10: 16 in" },
        ] },
      { n: "3", page: 1, result: "correct", student: "9", correct: "9", unit: "students",
        explanation: "Subtracting 7 from 25 gives 18, and dividing by 2 yields an average of 9 students.",
        steps: [
          { text: "Subtract the Saturday students from the total to find the number of students on Friday.", math: "25 − 7 = 18" },
          { text: "Divide the Friday total by the 2 classes to find the average.", math: "18 / 2 = 9" },
        ] },
      { n: "4", page: 1, result: "incorrect", student: "50", correct: "25",
        explanation: "The least positive integer is 25 since 2016 × 25 = 50400 ends in 00.",
        steps: [
          { text: "For 2016 × n to end in 00, it must be divisible by 100.", math: "2016n ≡ 0 (mod 100)" },
          { text: "Factor both numbers into prime factorizations: 2016 = 2⁵ × 3² × 7 and 100 = 2² × 5².", math: "2016 = 2⁵ × 3² × 7" },
          { text: "Determine the factors needed so that the product includes 5² = 25. Since 2016 has no factors of 5, n must be a multiple of 25.", math: "25 | n" },
          { text: "Test the smallest multiples of 25: 2016 × 25 = 50400, which ends in 00.", math: "n = 25" },
        ],
        mistakes: [{ step: 4, detail: "The student tested 10 and 50 but overlooked 25, which is smaller than 50 and also makes the product end in 00." }] },
    ],
  },
  {
    id: "essay",
    label: "Essay",
    title: "Narrative essay: My first sleepover",
    mode: "Essay Mode",
    seconds: 8,
    alt: "A handwritten grade 5 narrative about a first sleepover at a friend’s house.",
    pages: [
      {
        src: "/demo/grade/essay-first-sleepover.jpg", width: 744, height: 1100,
        essayNotes: [
          {
            kind: "paragraph", index: 1, isStrong: true, box: [0.048, 0.164, 0.929, 0.233],
            comment:
              "Leo establishes the topic right away and describes what he packed to set the scene effectively. Combining the last couple of clauses into two shorter sentences would help the rhythm flow even better.",
          },
          {
            kind: "paragraph", index: 2, isStrong: true, box: [0.049, 0.395, 0.915, 0.437],
            comment:
              "Leo builds strong momentum by listing fun sleepover activities and including lively details like Gabe being scared of the movie. Replacing repetitive sentence starters such as ‘and then’ would make the narrative flow more smoothly.",
          },
          {
            kind: "paragraph", index: 3, isStrong: true, box: [0.048, 0.829, 0.916, 0.127],
            comment:
              "Leo wraps up the experience neatly by mentioning the morning breakfast and sharing how much he enjoyed the night. Adding a detail about what kind of pancakes or conversation they had at breakfast would give the ending even more flavor.",
          },
          { kind: "spelling", issue: "Misspelling and missing possessive apostrophe", from: "Freind Gabes", to: "friend Gabe’s", box: [0.046, 0.167, 0.932, 0.04] },
          { kind: "spelling", issue: "Misspellings", from: "exited becuase", to: "excited because", box: [0.062, 0.199, 0.902, 0.044] },
          { kind: "spelling", issue: "Missing possessive apostrophe", from: "elses", to: "else’s", box: [0.056, 0.237, 0.859, 0.042] },
          { kind: "spelling", issue: "Misspelling and unnecessary capitalization", from: "Flashlite", to: "flashlight", box: [0.058, 0.356, 0.175, 0.04] },
          { kind: "spelling", issue: "Missing capital letter to start a sentence", from: "popcorn. we", to: "popcorn. We", box: [0.055, 0.476, 0.782, 0.042] },
          { kind: "spelling", issue: "Run-on sentence", from: "movie it", to: "movie; it", box: [0.058, 0.516, 0.845, 0.043] },
          { kind: "spelling", issue: "Missing capital letter and subject-verb agreement error", from: "then we was supposed", to: "Then we were supposed", box: [0.056, 0.632, 0.875, 0.045] },
          { kind: "spelling", issue: "Missing possessive apostrophe", from: "Gabes dad", to: "Gabe’s dad", box: [0.053, 0.673, 0.861, 0.044] },
          { kind: "spelling", issue: "Spelling error", from: "alot", to: "a lot", box: [0.053, 0.754, 0.891, 0.045] },
        ],
      },
    ],
    essay: {
      summary:
        "Leo writes about going to his friend Gabe’s house for his very first sleepover. He describes playing video games, eating hot dogs and popcorn, watching a scary movie about a doll, and laughing until late at night. The story concludes the next morning with pancakes and Leo expressing that he wants to do it again.",
      rubric: [
        { title: "Clerical", detail: "Leo provides his name and indents his paragraphs, but leaves the date blank and does not include a title.", result: "Partly met" },
        { title: "Grammatical", detail: "Leo struggles with possessive apostrophes, capitalization at sentence starts, run-on sentences, and subject-verb agreement.", result: "Partly met" },
        { title: "Composition", detail: "Leo tells a clear, chronological narrative with a defined beginning, middle, and end that fulfills the prompt well.", result: "Met" },
      ],
      comment:
        "Leo wrote an engaging, complete personal narrative that captures the excitement of his first sleepover with plenty of relatable details. His sequencing is clear and easy to follow from the initial arrival to the morning pancakes. Working on sentence punctuation and possessive apostrophes will help polish his storytelling even further.",
    },
  },
  {
    id: "reading",
    label: "Reading comprehension",
    title: "Reading comprehension: Energy flow",
    mode: "Brief",
    seconds: 7,
    alt: "A four-page science packet: a two-page article on energy flow, then two pages of questions.",
    pages: [
      { src: "/demo/grade/science-p1.jpg", width: 853, height: 1100, context: true },
      { src: "/demo/grade/science-p2.jpg", width: 876, height: 1100, context: true },
      {
        src: "/demo/grade/science-p3.jpg", width: 847, height: 1100,
        marks: [
          { n: "1", result: "correct", box: [0.07, 0.207, 0.038, 0.023] },
          { n: "2", result: "correct", box: [0.073, 0.305, 0.037, 0.021] },
          { n: "3", result: "correct", box: [0.09, 0.543, 0.038, 0.025] },
          { n: "4", result: "correct", box: [0.093, 0.677, 0.039, 0.025] },
          { n: "5", result: "correct", box: [0.096, 0.824, 0.041, 0.024] },
          { n: "6", result: "correct", box: [0.517, 0.89, 0.083, 0.024] },
          { n: "7", result: "correct", box: [0.316, 0.933, 0.154, 0.05] },
        ],
      },
      {
        src: "/demo/grade/science-p4.jpg", width: 845, height: 1100,
        unmarked: "Question 10 was graded but isn’t marked on the page",
        marks: [
          { n: "8", result: "correct", box: [0.18, 0.064, 0.321, 0.036] },
          { n: "9", result: "incorrect", box: [0.367, 0.098, 0.118, 0.035] },
        ],
      },
    ],
    rows: [
      { n: "1", page: 2, result: "correct", student: "b", correct: "b" },
      { n: "2", page: 2, result: "correct", student: "a", correct: "a" },
      { n: "3", page: 2, result: "correct", student: "d", correct: "d" },
      { n: "4", page: 2, result: "correct", student: "c", correct: "c" },
      { n: "5", page: 2, result: "correct", student: "b", correct: "b" },
      { n: "6", page: 2, result: "correct", student: "sun", correct: "sun" },
      { n: "7", page: 2, result: "correct", student: "primary", correct: "primary" },
      { n: "8", page: 3, result: "correct", student: "producers/plants", correct: "producers" },
      { n: "9", page: 3, result: "incorrect", student: "most", correct: "least" },
      { n: "10", page: 3, result: "incorrect", unmarked: true,
        student: "Producers: Grasses, Nuts and Berries; Primary Consumers: Mouse, Grasshopper, Bird; Secondary Consumers: Owl, Snake; Tertiary Consumers: Coyote",
        correct: "Producers: Grasses, Nuts and Berries; Primary Consumers: Mouse, Grasshopper, Bird; Secondary Consumers: Snake, Coyote, Owl, Bird; Tertiary Consumers: Coyote, Owl" },
    ],
  },
  {
    id: "college",
    label: "Derivation",
    title: "Lagrange multipliers",
    mode: "Detailed",
    seconds: 9,
    alt: "A typed optimization exercise with a handwritten Lagrange-multiplier solution.",
    pages: [
      {
        src: "/demo/grade/college-lagrange.jpg", width: 811, height: 985,
        marks: [{ n: "7", result: "correct", box: [0.093, 0.577, 0.384, 0.113] }],
      },
    ],
    rows: [
      { n: "7", page: 0, result: "correct",
        student: "x = x₀ + (w₀ − wᵀx₀) / ‖w‖² · w",
        correct: "x₀ + (w₀ − wᵀx₀) / ‖w‖₂² · w",
        explanation: "The student correctly set up the Lagrangian, found the stationary point, solved for the Lagrange multiplier, and substituted back to get the optimal solution.",
        steps: [
          { text: "Formulate the Lagrangian using the objective function and equality constraint.", math: "L(x, λ) = ½‖x − x₀‖₂² − λ(wᵀx − w₀)" },
          { text: "Set the gradient with respect to x to zero to find the stationary point.", math: "∇ₓL(x, λ) = (x − x₀) − λw = 0  ⟹  x = x₀ + λw" },
          { text: "Apply the constraint wᵀx = w₀ by multiplying by wᵀ.", math: "wᵀx = wᵀx₀ + λ‖w‖₂² = w₀  ⟹  λ = (w₀ − wᵀx₀) / ‖w‖₂²" },
          { text: "Substitute λ back into the expression for x.", math: "x = x₀ + (w₀ − wᵀx₀) / ‖w‖₂² · w" },
        ] },
    ],
  },
];
