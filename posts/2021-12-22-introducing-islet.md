<title>Introducing... Islet!</title>

You may remember in my last post I said I was starting a project based on [Zonelets](https://zonelets.net) which would turn it into a server-based website with a few extra features. If you haven't noticed yet, this blog has now been moved over to Islet! Look at the footer if you don't believe me 😉

## What is it?

<img src="/images/islet-logo-96.png" alt="islet logo" class="right" height="96">

Islet (a small island, pronounced EYE-let) is a tiny blogging framework written in Javascript that you host on a server! It looks pretty much exactly like Zonelets (that's on purpose) so you can migrate without having to rework your themes or what-have-you. You can find the code [on GitHub](https://github.com/katacarbix/islet)!

## Features & anti-features

So now you may be wondering, what's different about it? Well I'm glad you asked. Here's a comprehensive list of the added features and improvements over Zonelets:

- **Templating** - Instead of having full HTML pages that you need to copy and paste whenever you want to make a new post, you now have "building blocks" that allow you to reuse any part of the page, keeping duplicate code to a minimum. Zonelets already partially does this by inserting the header, footer, and page title on the fly; however if you wanted to change the CSS theme or add a comment section widget you would have to make that change on *every single page*. These templates create the "structure" of the page but not the actual blog posts' contents, so you could avoid ever having to touch them if you don't want to.
- **Markdown** - Zonelets encourages writing in plain HTML and makes it easy to learn by including an HTML cheat sheet that's also an example of a blog post. I have plenty of experience writing HTML but I personally feel Markdown is easier to write and modify without accidentally breaking something (i.e. mismatching opening/closing tags). Islet allows you to write blog posts in whichever markup language you prefer, and does not limit you if you, for example, start writing in Markdown and later decide to add some HTML. Just give your post file a ".md" extension and you're golden!
- **RSS feed** - Not everyone uses or cares about RSS feeds, but if you do it's there! The only extra configuration that's required is to put a valid URL to your blog in the config file. 
- **Javascript not required in the browser** - Some web browsers block Javascript or don't support it at all. Moving the code that's required for Zonelets to work to a server means more visitors' web browsers will be able to display your blog properly!

Phew! Sounds great, right? Well... there are still reasons you might want to use Zonelets instead of Islet, such as:

- **It needs a server to work** for the same reason as the point above. The word "server" might invoke the image of a large, expensive datacenter with cables running everywhere, but that doesn't have to be the case. Islet is small and lightweight enough that you could host it from home on an old laptop or a [cheap credit card-sized computer](https://www.raspberrypi.com/)! There are also cheap or even free (to an extent) remote hosting options you could consider if you don't have that option. I'll compile a list of these to include with the Islet documentation.
- **Editing the Islet code can be a *biiiit* more advanced** - The neat thing about Zonelets is that it's just a few HTML/CSS/Javascript files you can modify with just a little bit of background knowledge. Islet complicates this a little bit by adapting it to NodeJS, which may look similar but works a bit differently than JS written for a web browser. I think it's worth looking around and figuring out how it works on your own; I promise it's not too complicated!

The next feature I want to work on is the ability to render a static version of your blog on your computer which can then be hosted anywhere that allows static sites! If you chose this route for hosting you would have to re-render any time you make updates or publish new posts and then reupload all the files. The benefit is that it wouldn't require a server which would open your options to free static hosting (like Neocities).

## Concluding remarks

I hope people will find Islet to be useful. I really like the idea of choosing a small DIY blogging framework to write with instead of relying on overpowered one-size-fits-all options like Wordpress or Squarespace.

I don't want to overshadow Zonelets with this project. I will continue to mention it in any documentation for Islet and donate 50% of any monetary support I receive from this project to Marina.

Thanks for reading! Bye!

🌴
