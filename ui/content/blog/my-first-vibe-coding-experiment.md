---
title: 'My First Vibe Coding Experiment: an optimistic approach'
excerpt: I thought vibe coding would be as simple as typing "build a webpage for my cats" and watching AI work its magic. Unfortunately... it was not that easy.
date: 2025-09-03
tags:
  - Homepage
  - AI Coding
  - Vibe Coding
  - GitHub Copilot
  - Developer Experience
author: Juan insuasti
publish: 2025-09-03
---

> _This is part 3 of creating a homepage in 2025. I actually managed to write 3 posts in a series! If you haven't read part 2 [you can find it here](/blog/embracing-ai-overlords)._

I left my last post, with my hopes up high. Ready to begin my journey into AI-assisted development. The next step for me dive headfirst into `vibe coding`.

When I think of vibe coding I imagine it as effortless as writing a prompt like "build a webpage for my cats" and BOOM, instant website. At least, that's what all the hype is about, right? People are selling AI as this magical tool that can do almost everything at a fraction of the cost. Why pay for a software developer when you can ask the genie in the lamp to grant your coding wishes? A $200 monthly AI subscription versus an $8,000 human who needs breaks, has to breathe, and demands food? The choice seems obvious to our new AI overlords.

But beyond what I could infer from all the hype, I had never actually looked into the real definition of vibe coding. So I did a bit of research, and honestly? It blew my mind. (it even has a dictionary [entry](https://www.merriam-webster.com/slang/vibe-coding))

According to [wikipedia](https://en.wikipedia.org/wiki/Vibe_coding):

> "It describes a [chatbot](https://en.wikipedia.org/wiki/Chatbot 'Chatbot')-based approach to creating [software](https://en.wikipedia.org/wiki/Application_software 'Application software') where the developer describes a project or task to a [large language model](https://en.wikipedia.org/wiki/Large_language_model 'Large language model') (LLM), which generates code based on the [prompt](https://en.wikipedia.org/wiki/AI_prompt 'AI prompt').
> **The developer does not review or edit the code**, but solely uses tools and execution results to evaluate it and asks the LLM for improvements. Unlike traditional AI-assisted coding or [pair programming](https://en.wikipedia.org/wiki/Pair_programming 'Pair programming'), the human developer avoids examination of the code, accepts AI-suggested completions without human review, and focuses more on iterative experimentation than code correctness or structure."

This actually sounds amazing: no need to worry about the underlying code? Pure sci-fi if you ask me. The concept is beautifully simple: no human revision of the code, no manual fixing, whatever the AI overlords want the code to be, so be it.

> [!NOTE] **A little context about my project** (feel free to skip if you're itching to get to the experiment).
>
> I started building a personal website earlier this year with plans to add a blog and project showcase. The original site was built using Next.js, TypeScript, Tailwind CSS, and Shadcn UI. At the time, I only had one page with a hero section, an about section, and a footer. I also use Storybook for building components in isolation.
>
> While the page wasn't complete, it was a well-structured project following best practices with organized directories and clean architecture. Why am I telling you this? Because I think it's important to establish the baseline for this experiment. Like setting up the theoretical framework in research. The AI wasn't starting from scratch; it had a solid foundation to work with.
>
> Anyway... let's dive into the chaos.

## The experiment begins

I selected `Claude Sonnet 4` for my model and I typed my first prompt "Create a blog page for my website " and I hit enter expecting the best while bracing for the worst.

What followed was a 30-minute marathon of giving Copilot permission to keep doing... whatever it was doing. Files were spawning left and right, directories were being created, and I watched in fascination as my project structure expanded before my eyes. Until at long last, the terminal give me the prompt to start the development server.

Time to see what the AI had cooked up.

The dish was, predictably, an error message.

Was I really expecting it to work flawlessly? No. But I definitely didn't expect it to take half an hour just to fail spectacularly. I inspected the terminal and found the culprit: a `useEffect` hook was being called inside a server component. For those unfamiliar with React/Next.js, this is like trying to use a browser feature on the server, or asking for soup at McDonnalds.

The fix? Actually pretty simple. So I told Copilot to handle it.

> [!NOTE]
> In case you're wondering. The solution was to add ` 'use client'` at the top of the file.

And that's exactly where I broke the sacred vows of vibe coding. I shouldn't have looked at the error. I shouldn't have diagnosed the problem. According to the true spirit of vibe coding, I should have just let the AI figure out its own mess without any human intervention.

## Debugging gone wild

That's when I discovered that vibe debugging is absolutely hilarious, and not in a good way.

You know how sometimes you ask ChatGPT to modify a tiny part of a text and it returns something completely different? Well, Copilot apparently decided that a massive chunk of the code it had just written could be "improved." Instead of fixing the simple `useEffect` issue, it went on a rewriting spree, touching multiple files and restructuring entire components.

After a couple of minutes of this digital renovation, it cheerfully asked me to run the dev server again.

The original error was still there.

After several increasingly frustrated iterations, I threw in the towel. The AI either made vast changes across different files (introducing new bugs in the process) or completely failed to understand the error message. I tried everything: copying and pasting the literal error message, giving it step-by-step instructions, even spelling out exactly where to add the `'use client'` directive.

Nothing worked.

I officially failed my first vibe coding experiment when I decided to fixed the error myself. AI had actually introduced several new errors along the way, missing imports, wrong types, basic stuff like that—but they were all pretty straightforward to fix once I abandoned the hands-off approach.

## Results

After fixing the error to actually get things running, the result was something very similar to the page you're currently reading (if you're seeing this in 2025). The design was mostly solid, clean, professional, and with a few tweaks, I managed to achieve a consistent look and feel with my other pages.

Of course, making those tweaks meant breaking another sacred vow of vibe coding. But at this point, I figured the experiment was already compromised, so why not go full heretic?

Then I made the mistake of taking a peek at the actual code.

Let's just say that when I saw what was under the hood, I decided to scrap this entire experiment and start from scratch. The AI had certainly created something that _worked_, but the code itself was... well, let's be charitable and call it "creative." It was the kind of code that makes you wonder if the AI had been having fever dreams about React components.

The visual result was decent, but the foundation was built on digital quicksand.

![The blog page created by Copilot](/blog/blog-test.jpg)

## What Went Wrong?

Looking back, I wonder if this experiment failed because of my existing project structure. Working within an established codebase is inherently more complex than starting fresh. Most likely, this same prompt would have worked much better in something like V0, where building isolated components is the bread and butter.

Though I should mention, I actually tried this exact prompt in V0 afterward, and it also struggled to deliver. Maybe a "blog page" is just too vague and complex, even for specialized tools.

I know what you're thinking: "Of course it didn't work. You gave it practically no context!" And you're absolutely right. It was unfair of me to ask for a complex feature with minimal guidance, even though the AI had access to my entire project structure and blogs are incredibly common features.

However, this little experiment confirmed something important: creating meaningful features with AI isn't as simple as "typing a few words and watching magic happen." You need to provide detailed, precise descriptions of what you want. Essentially, you have to become a business analyst, crafting very detailed, clear specifications. Basically writing a perfect Jira ticket. Good luck with that.

## The Real Cost of Vibe Coding

Here's something that made me pause: I burned through more than 10% of my monthly Copilot credits on this single experiment (less than 2 hour). That makes me wonder if whoever coined the term "vibe coding" was secretly thinking about how much money AI companies would make from vibe coders burning through credits with each iteration, spending resources to explain errors instead of taking one minute to fix simple issues themselves.

Food for thought.

![The initial prompt burned 5% of my credits](/blog/premium-requests.jpg)

## My Takeaways So Far

My conclusion after this first experiment is that full vibe coding may work for disposable prototypes, greenfield projects or even design inspiration. As things are now, I wouldn't trust it for anything more complex than that. My position could change if the technology improves, but for now, I see vibe coding as a fun experiment rather than a practical development approach. Sorry Skynet, not today.

> [!NOTE]
> A greenfield project is basically a new project, but saying "greenfield" makes you sound way more professional in meetings.

## What's Next?

I'm not giving up on AI assisted coding just yet. In my next post, I'll level up my approach with detailed instructions, comprehensive project descriptions, and strategic iteration techniques. According to the internet, I simply lacked context in this first attempt.

I'll spoil a bit of my next experiment: I tried this improved approach, and things got significantly better... the dev server actually ran without issues on the first try. Stay tuned for less vibe and more actual coding!
