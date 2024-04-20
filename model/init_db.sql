SET foreign_key_checks = 0;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `shelves`;
DROP TABLE IF EXISTS `items`;
DROP TABLE IF EXISTS `favorites`;
SET foreign_key_checks = 1;

/* Setting starting point for auto increment for each table at increments of 10011 so that we can immediately tell during development which kind of id an id is, thus helping to avoid logic errors.

starts with "1" > user;
starts with "2" > shelf;
starts with "3" > item;
  */

CREATE TABLE `users` (
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `user_bio` VARCHAR(255) DEFAULT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `follower_count` INT NOT NULL DEFAULT 0,
    `image` VARCHAR(255),
    UNIQUE (username, email)
)
ENGINE=InnoDB AUTO_INCREMENT=10011;

CREATE TABLE `shelves` (
    `shelf_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL REFERENCES `users`(`user_id`),
    `shelf_name` VARCHAR(255) NOT NULL,
    `shelf_description` VARCHAR(255) NOT NULL,
    `is_public` TINYINT(1) NOT NULL DEFAULT 0,
    `category` VARCHAR(255) NOT NULL,
    `num_voters` INT NOT NULL DEFAULT 0,
    `count_rating` INT NOT NULL DEFAULT 0,
    `shelf_add_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)
ENGINE=InnoDB AUTO_INCREMENT=20022;

CREATE TABLE `items` (
    `item_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `shelf_id` BIGINT UNSIGNED NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255),
    `site_name` VARCHAR(255),
    `image` VARCHAR(255),
    `item_add_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`shelf_id`) REFERENCES `shelves`(`shelf_id`) 
)
ENGINE=InnoDB AUTO_INCREMENT=30033;

CREATE TABLE `favorites` (
    `fav_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `shelf_id`BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (`shelf_id`) REFERENCES `shelves`(`shelf_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);

--  Dummy data

-- USERS WITH SHELVES

-- log-in password is email address
INSERT INTO `users` (`first_name`, `last_name`, `user_bio`, `username`, `email`, `password`, `follower_count`, `image`)
VALUES
    ('Chandler', 'Bing', 'something cool and interesting', 'bing11', 'bing11@email.com', '$2b$12$m.3Ml/QjZcNsfFDTUBNv2O8KgnyGJ2/zwa8hQwLQ75A872hvAD8rG', 42, '30f6512d95d5c349cd90e40a0dd0d6be.png'), -- user 10011
    ('Phoebe', 'Buffay', 'something cool and interesting', 'buffay12', 'buffay12@email.com', '$2b$12$AVwrTO2kB94NrHuRkHIt1OYNj9eb/d.yC4Nv18kBZujMrBnpdZ/ui', 33, 'e8edbae87fe0614110914ab15bf799ae.jpeg'), -- user 10012
    ('Rachel', 'Green', 'something cool and interesting', 'green13', 'green13@email.com', '$2b$12$nyekTjUF0aFmarW2s.WdMeF9RrZhbXsjcACqBRN5vOR0HlqdGzwe.', 38, '17765edb5d730bf61e145b92faec11d7.png'); -- user 10013

-- USERS WITH NO PUBLIC SHELVES

-- log-in password is email address
INSERT INTO `users` (`first_name`, `last_name`, `user_bio`, `username`, `email`, `password`, `image`)
VALUES
    ('Pam', 'Beesley', 'something cool and interesting', 'beesley14', 'beesley14@email.com', '$2b$12$0M2N7dl33ehyQ8EgXTstK..JnxuqV4GjNlRkN8Kk8ew.7Bl04Hn06', 'f05031e4279dc088fdf3501008abe645.jpeg'), -- user 10014
    ('Jim', 'Halpert', 'something cool and interesting', 'halpert15', 'halpert15@email.com', '$2b$12$L/RPK2zjHgI0Rem13A97keiCgeWjKn0ezDshSuscBDFPyfKpNgERG', 'e4d426dec158bbcb860c361c6ea2532b.png'), -- user 10015
    ('Monica', 'Geller', 'something cool and interesting', 'geller16', 'geller16@email.com', '$2b$12$DhE5s8TP3ex6K0vbiitNoudq4ud75AHaRv/NR1ApivfTRFymP9DS.', '898c4e27ba8ca31044b91b27a72b40ec.png'); -- user 10016

-- PUBLIC SHELVES
INSERT INTO `shelves` (`user_id`, `shelf_name`, `shelf_description`, `category`, `is_public`, `num_voters`, `count_rating`)
VALUES 
    (10011, 'Norwegian B2', 'Free resources for learning Norwegian at B2 level', 'Languages & Linguistics', 1, 50, 195), -- shelf 20022
    (10011, 'Python', 'Resources for learning Python', 'Technology & Programming', 1, 80, 352), -- shelf 20023
    (10011, 'Knitting', 'Knitting for beginners', 'Arts & Crafts', 1, 78, 209), -- shelf 20024
    (10011, 'Sourdough', 'How to make sourdough for beginners', 'Cooking, Baking & Culinary Arts', 1, 77, 315), -- shelf 20025
    (10011, 'Desserts', 'How to make desserts for beginners', 'Cooking, Baking & Culinary Arts', 1, 75, 305), -- shelf 20026
    (10012, 'Middle East Cuisine', 'Best of Middle East Cuisine', 'Cooking, Baking & Culinary Arts', 1, 55, 254), -- shelf 20027
    (10012, 'Writing a novel', 'Writing a novel for beginners', 'Literature & Writing', 1, 89, 378), -- shelf 20028
    (10012, 'YouTube', 'Starting a YouTube Channel', 'Photography & Videography', 1, 72, 209), -- shelf 20029
    (10012, 'Java', 'Everything you need to learn Java', 'Technology & Programming', 1, 69, 255), -- shelf 20030
    (10012, 'German language stuff', 'Lots of free German language resources', 'Languages & Linguistics', 1, 65, 223), -- shelf 20031
    (10013, 'Electrical Engineering 101', 'Electrical engineering for beginners', 'Engineering & Mechanics', 1, 80, 352), -- shelf 20032
    (10013, 'Yoga Videos', 'Free resources for practicing Yoga', 'Health & Wellness', 1, 72, 209), -- shelf 20033
    (10013, 'Korean War', 'Intro to the Korean war', 'History & Social Sciences', 1, 75, 309), -- shelf 20034
    (10013, 'Home business', 'All about starting a business from home', 'Business & Entrepreneurship', 1, 80, 352), -- shelf 20035
    (10013, 'Coding for Kids', "Fun intro to coding for kids", 'Technology & Programming', 1, 105, 567), -- shelf 20036
    (10013, "Prisoner's dilemma", "Understanding the prisoner's dilemma", 'Games, Game Design & Game Theory', 1, 90, 350), -- shelf 20037
    (10014, "Screenwriting 101", "Getting started in Screenwriting", 'Literature & Writing', 1, 107, 390); -- shelf 20038

-- PRIVATE SHELVES
    INSERT INTO `shelves` (`user_id`, `shelf_name`, `shelf_description`, `category`)
VALUES 
    (10011, 'Journaling', 'How to develop a journaling habit', 'Personal Development & Self-Help'), -- shelf 20039
    (10012, 'Intro to AI', 'All about AI for beginners', 'Technology & Programming'), -- shelf 20040
    (10013, 'Building a Patio', 'How to design and build a patio', 'DIY & Home Improvement'), -- shelf 20041
    (10014, 'Line drawing', 'Learn to draw online', 'Fine Arts & Painting'); -- shelf 20042

INSERT INTO items (shelf_id, url, title, site_name, description, image) VALUES
(20022, "https://ordbokene.no/?ordbok=begge", "Bokmalsordboka og Nynorskordboka - ordbokene.no", "ordbokene.no", "Bokmalsordboka og Nynorskordboka viser skrivemate og boyning i trad med norsk rettskrivning. Sprakradet og Universitetet i Bergen star bak ordbokene.", "https://ordbokene.no/logo.png"),
  (20022, "https://open.spotify.com/show/2RODeyQhipqoLjfHmPGpiN", "Norsklaerer Karense", "Spotify", "Listen to Norsklaerer Karense on Spotify. Dette er en podcast for alle som lærer norsk. Jeg snakker om nyheter og forskjellige temaer på norsk. Dette er en fin lyttetrening!", "https://i.scdn.co/image/ab6765630000ba8a694c81e908186cec77a8d41b"),
  (20022, "https://www.youtube.com/watch?v=uWQYqcFX8JE", "How I learnt Norwegian on my own", "YouTube", "Hi, my name is Ilys, I was born and raised in France, and today I have lived in Norway for 3 years. Since the beginning, moving to Norway hasn't felt like mo...", "https://i.ytimg.com/vi/uWQYqcFX8JE/maxresdefault.jpg"),
  (20022, "https://www.youtube.com/watch?v=NPxOZD1Zyu0", "How I Learned Norwegian in 6 Months | Bergenstesten | Move to Norway", "YouTube", "This video is about my Norwegian learning experience and how I passed the Bergenstest / How to pass Bergenstesten (the Norwegian B2 exam) after 6 months of d...", "https://i.ytimg.com/vi/NPxOZD1Zyu0/maxresdefault.jpg"),
  (20022, "https://www.youtube.com/watch?v=ft0TbsABuFY", "Learn Norwegian in 30 Minutes - ALL the Basics You Need", "YouTube", "Learn Norwegian twice as fast with your FREE gifts of the month including PDF lessons, vocabulary lists and much more! Get your gifts now: https://goo.gl/ccb...", "https://i.ytimg.com/vi/ft0TbsABuFY/maxresdefault.jpg"),
  (20022, "https://www.lingohut.com/en/l87/learn-norwegian", "Free Norwegian lessons", NULL, "Speak Norwegian. Play a game & Teach yourself Norwegian. LingoHut contains 125 online Norwegian lessons to learn useful vocabulary without prior knowledge. Learn to speak Norwegian.", "https://www.lingohut.com/html/lht-index-page/Candy-no-FB-min.png"),
  (20023, "https://www.youtube.com/watch?v=rfscVS0vtbw", "Learn Python - Full Course for Beginners [Tutorial]", "YouTube", "This course will give you a full introduction into all of the core concepts in python. Follow along with the videos and you'll be a python programmer in no t...", "https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg"),
  (20023, "https://www.learnpython.org/", "Learn Python - Free Interactive Python Tutorial", NULL, "learnpython.org is a free interactive Python tutorial for people who want to learn Python, fast.", "https://www.learnpython.org/static/img/share-logos/learnpython.org.png"),
  (20023, "https://www.dataquest.io/blog/learn-python-the-right-way/", "How to Learn Python (Step-By-Step) in 2024", "Dataquest", "Learn Python the right way. Avoid the pitfalls that make people quit, maximize the time spent on fun projects, and accelerate learning.", "https://www.dataquest.io/wp-content/uploads/2023/03/learning-and-motivation-tips-1.png"),
  (20023, "https://www.w3schools.com/python/", "Python Tutorial", NULL, "Well organized and easy to understand Web building tutorials with lots of examples of how to use HTML, CSS, JavaScript, SQL, Python, PHP, Bootstrap, Java, XML and more.", "https://www.w3schools.com/images/w3schools_logo_436_2.png"),
  (20024, "https://www.youtube.com/watch?v=p_R1UDsNOMk", "How to Knit: Easy for Beginners", "YouTube", "Don't forget part 2! https://youtu.be/oh1SIfTpm-0 Buy my book: https://www.waterstones.com/book/the-disassembly-of-doreen-durand/ryan-collett/9781913207397...", "https://i.ytimg.com/vi/p_R1UDsNOMk/maxresdefault.jpg"),
  (20024, "https://www.craftyarncouncil.com/standards/knitting-abbreviations", "Knitting Abbreviations Master List | Welcome to the Craft Yarn Council", NULL, NULL, "https://www.craftyarncouncil.com/sites/all/themes/cyc/images/cyc-logo.svg"),
  (20024, "https://www.thesprucecrafts.com/knitting-4162934", "Knitting", "The Spruce Crafts", "Grab your knitting needles and some yarn to get started. You can learn how to knit or improve your skills with our knitting tutorials, patterns, tips and more.", "https://www.thesprucecrafts.com/thmb/mqZ8GzM_QpsgbOxMqE5RWsNVnBg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SPRC_SocialImage-no-transparency-5ad5fc0c875db90036b224b6.png"),
  (20024, "https://sheepandstitch.com/how-to-knit/", "How To Knit for Beginners - Sheep and Stitch", "Sheep and Stitch", "Learn how to knit for total beginners with this detailed knitting guide. Using video and photo tutorials, learn how to knit step by step through repetition.", "https://sheepandstitch.com/wp-content/uploads/2019/01/learn-how-to-knit-ultimate-guide-new.jpg"),
  (20024, "https://sarahmaker.com/how-to-knit/", "How to Knit: Complete Guide for Beginners", "Sarah Maker", "Learn how to knit from the very beginning, including how to hold the needles and yarn, how to cast on and bind off, and how to knit stitch.", "https://sarahmaker.com/wp-content/uploads/2022/05/sarahmaker-knit-stitch-15.jpg"),
  (20024, "https://www.youtube.com/watch?v=Zjq0MoUZqVY", "How to Knit - for absolute BEGINNERS!", "YouTube", "Full instructions & patterns: https://bit.ly/3rTTajZIn this step by step video you will learn how to make a slip knot, cast on, knit stitch and cast off.Want...", "https://i.ytimg.com/vi/Zjq0MoUZqVY/maxresdefault.jpg"),
  (20025, "https://www.theclevercarrot.com/2014/01/sourdough-bread-a-beginners-guide/", "Sourdough Bread: A Beginner's Guide - The Clever Carrot", "The Clever Carrot", "A step-by-step beginner's guide for easy, homemade sourdough bread (no yeast). This recipe is baked in a Dutch oven. No-kneading required.", "https://www.theclevercarrot.com/wp-content/uploads/2013/12/sourdough-bread-round-1-of-1.jpg"),
  (20025, "https://www.theperfectloaf.com/best-sourdough-recipe/", "My Best Sourdough Recipe | The Perfect Loaf", "The Perfect Loaf", "My best sourdough recipe for baking healthy and delicious bread using your sourdough starter and only three ingredients, right from home.", "https://www.theperfectloaf.com/wp-content/uploads/2015/12/theperfectloaf-mybestsourdoughrecipe-title-1.jpg"),
  (20025, "https://www.theclevercarrot.com/category/sourdough-recipes/", "Sourdough Bread Recipes Archives - The Clever Carrot", "The Clever Carrot", "Discover hundresds of easy, practical, no-nonsense sourdough bread recipes for the beginner home baker (without kneading).", "data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%20400%20400%27%3E%3C/svg%3E"),
  (20025, "https://simplytaralynn.com/2024/03/07/the-best-sourdough-bread-recipe-easy-for-beginners/", "The Best Golden Sourdough Bread Recipe | Easy for Beginners - Simply Taralynn | Food & Lifestyle Blog", "Simply Taralynn | Food & Lifestyle Blog", "This post about my sourdough bread journey has been a long time coming. I've been working so hard to perfect my process, and although...", "https://simplytaralynn.com/wp-content/uploads/2023/03/1L9A8434-2-3.jpg"),
  (20026, "https://cakebycourtney.com/best-cakes-for-beginner-bakers/", "Best Cakes for Beginner Bakers - Cake by Courtney", "Cake by Courtney -", "Having a hard time picking which cake to make first? Today I've narrowed down my list of cakes to the five best cakes for beginner bakers. These five cakes are not only simple though, they taste amazing and will wow a crowd!", "https://cakebycourtney.com/wp-content/uploads/2018/07/Cake-Table-e1563806568365.jpg"),
  (20026, "https://www.youtube.com/watch?v=MjVgIXccYXA", "The Most Fool-Proof Macarons You'll Ever Make", "YouTube", "https://www.buzzfeed.com/marietelling/how-to-make-macarons?utm_term=.kkgkRxLmw#.ae7RewPg4Get the recipe! - https://tasty.co/recipe/macaronsShop the Tasty kit...", "https://i.ytimg.com/vi/MjVgIXccYXA/maxresdefault.jpg"),
  (20026, "https://www.youtube.com/watch?v=xdowDWYurzw", "How to Decorate a Cake", "YouTube", "How to Decorate a CakeFull Post: https://preppykitchen.com/how-to-decorate-a-cake/Making a beautiful cake shouldn't be frustrating, unfortunately I know that...", "https://i.ytimg.com/vi/xdowDWYurzw/maxresdefault.jpg"),
  (20026, "https://www.youtube.com/watch?v=VvJm4pQZ04s", "The Best Brownies You'll Ever Eat", "YouTube", "https://www.buzzfeed.com/marietelling/heres-exactly-how-to-make-the-best-brownies-of-your-life?utm_term=.riAvJ3ae2x#.qrQ6pkmVxvShop the Tasty kitchenware col...", "https://i.ytimg.com/vi/VvJm4pQZ04s/maxresdefault.jpg"),
  (20026, "https://www.youtube.com/watch?v=dd2V1tsgdVc", "Homemade dessert that I never get tired of eating! Creamy smooth it melts in mouth!", "YouTube", "Full recipe at: https://vargasavourrecipes.com/caramel-puddings/More related recipes: https://vargasavourrecipes.com/**Cooking gears I used in all my videos*...", "https://i.ytimg.com/vi/dd2V1tsgdVc/maxresdefault.jpg"),
  (20026, "https://www.youtube.com/watch?v=iDcekQeBGOY", "Sweet Milk Balls | Amazing Recipe in 5 minutes", "YouTube", "Milk Balls Recipe. The recipes I all refer to online and edit according to taste, I am not the first person in the world to make this dish Ingredie...", "https://i.ytimg.com/vi/iDcekQeBGOY/maxresdefault.jpg"),
  (20027, "https://www.inspiredtaste.net/15938/easy-and-smooth-hummus-recipe/", "Easy Hummus (Better than Store-Bought)", "Inspired Taste - Easy Recipes for Home Cooks", "How to make homemade hummus with chickpeas, garlic, tahini and olive oil. This is the best hummus recipe, just read all the happy reviews. With video!", "https://www.inspiredtaste.net/wp-content/uploads/2019/07/The-Best-Homemade-Hummus-Recipe-1200-1197x800.jpg"),
  (20027, "https://thematbakh.com/best-traditional-lebanese-food-dishes/", "The Best Traditional Lebanese Food Dishes (24 Recipes)", "The Matbakh", "Here are 24 of the best traditional Lebanese food dishes that taste amazing and have step-by-step instructions so they turn out perfectly!", "https://thematbakh.com/wp-content/uploads/2022/12/21-DELICIOUS.jpg"),
  (20027, "https://maureenabood.com/lebanese-couscous-salad/", "Lebanese Couscous Salad - Maureen Abood", "Maureen Abood", "Lebanese Couscous Salad is made with larger sized couscous. This is a versatile salad that takes well to a variety of vegetables and herbs.", "https://maureenabood.com/wp-content/uploads/2022/06/Lebanese-couscous-salad-with-a-spoon-Maureen-Abood-jpg-webp.webp"),
  (20027, "https://www.youtube.com/watch?v=PdGMnAt2sRY", "BEST EGYPTIAN FALAFEL EVER", "YouTube", "Ta'ameya, is Egyptian falafel made with fava beans rather than chickpeas. It has an insanely crispy exterior and a fluffy interior that's not matched by any ...", "https://i.ytimg.com/vi/PdGMnAt2sRY/maxresdefault.jpg"),
  (20027, "https://www.youtube.com/watch?v=9RGbr9m-uCY", "The Only Video YOU NEED, To Make EPIC Falafel", "YouTube", "Head to https://www.squarespace.com/MiddleEats to save 10% off your first purchase of a website or domain using code MiddleEats.Falafel are one of the Middle...", "https://i.ytimg.com/vi/9RGbr9m-uCY/maxresdefault.jpg"),
  (20027, "https://www.youtube.com/watch?v=s1Qsl5_-gFU", "Middle Eastern Pita bread. A classic versatile flatbread", "YouTube", "Here's how I like to make Arabian style pitta (pita) breads. These differ from the Greek ones in shape, thickness and texture. They're a very versatile bread...", "https://i.ytimg.com/vi/s1Qsl5_-gFU/maxresdefault.jpg"),
  (20030, "https://www.youtube.com/watch?v=eIrMbAQSU34", "Java Tutorial for Beginners", "YouTube", "Master Java with this beginner-friendly tutorial! Build apps, websites, and start your coding journey. Ready for a deep dive? - Check out my complete c...", "https://i.ytimg.com/vi/eIrMbAQSU34/maxresdefault.jpg"),
  (20030, "https://www.codecademy.com/learn/learn-java", "Learn Java | Codecademy", "Codecademy", "Learn to code in Java — a robust programming language used to create software, web and mobile apps, and more. ", "https://static-assets.codecademy.com/assets/course-landing-page/meta/16x9/learn-java.jpg"),
  (20030, "https://www.youtube.com/watch?v=drQK8ciCAjY", "Learn Java in One Video - 15-minute Crash Course", "YouTube", "Learn all the essential basics of Java in one video in just 15 minutes. No programming experience required.Complete Java Course: https://codingwithjohn.think...", "https://i.ytimg.com/vi/drQK8ciCAjY/maxresdefault.jpg"),
  (20030, "https://www.youtube.com/watch?v=7WiJGTPuVeU", "Java Beginner Course - Get Started Coding with Java!", "YouTube", "Learn how to start programming in Java in this beginners course.What you will learn:-The absolute basics of getting started with Java-Understand the componen...", "https://i.ytimg.com/vi/7WiJGTPuVeU/maxresdefault.jpg"),
  (20030, "https://www.evergrowingdev.com/p/6-great-resources-to-learn-java-without", "6 Great Resources To Learn Java Without Spending a Penny", NULL, "Useful resources to learn Java for free in 2023.", "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd8326941-2fb3-4e16-9a2d-78c8581369bd_1600x840.png"),
  (20030, "https://www.youtube.com/watch?v=A74TOX803D0", "Java Programming for Beginners – Full Course", "YouTube", "Learn the Java programming language in this complete beginner's course. You will learn all the main features of Java (version 17) and how to use Java for you...", "https://i.ytimg.com/vi/A74TOX803D0/maxresdefault.jpg"),
  (20031, "https://learngerman.dw.com/en/beginners/s-62078399", "Beginners", "DW Learn German", NULL, NULL),
  (20031, "https://www.youtube.com/watch?v=PjdYxieJ5Oo", "How I Study German (Resources + Tips)", "YouTube", "Hallooo zusammen! It has been a while, I know. I'm glad to bring a well-prepared video to you guys about how and why I study German. German is not an easy la...", "https://i.ytimg.com/vi/PjdYxieJ5Oo/maxresdefault.jpg"),
  (20031, "https://coerll.utexas.edu/dib/index.php", "Deutsch im Blick", NULL, "Deutsch im Blick is an online German course from the University of Texas at Austin.", "https://coerll.utexas.edu/dib/images/frame_top_home.png"),
  (20031, "https://coerll.utexas.edu/gg/index.html", "Grimm Grammar : Home", NULL, "Grimm Grammar is an online German grammar reference from the University of Texas at Austin.", "https://coerll.utexas.edu/gg/images/home/castle.png"),
  (20036, "https://scratch.mit.edu/", "Scratch - Imagine, Program, Share", NULL, "Scratch is a free programming language and online community where you can create your own interactive stories, games, and animations.", "https://scratch.mit.edu/images/scratch-og.png"),
  (20036, "https://www.coderobo.ai/", "", NULL, "Inspire kids in STEM! An easy-to-use platform to teach coding and robotics at K-12 grades, summer camps, and after-school programs. No need to buy a robot.", NULL),
  (20036, "https://www.tynker.com/", "Coding For Kids, Kids Online Coding Classes & Games | Tynker", "Tynker.com", "Tynker’s proven online learning platform makes coding for kids fun, exciting and easy. Click here to learn more about this learn to code STEM program.", "https://www.tynker.com/image/homepage/share-thumbnail-homepage.png"),
  (20036, "https://www.youtube.com/watch?v=_j4Lj-BT00g", "PROGRAMMING for kids. Basic concepts Part 1", "YouTube", "In this educational video, children will learn what programming is in a very simple way. Programming is the language of technology and machines. It was creat...", "https://i.ytimg.com/vi/_j4Lj-BT00g/maxresdefault.jpg"),
  (20036, "https://www.codemonkey.com/glp-coding-for-kids-abs/", "Coding for Kids | Game-Based Programming | CodeMonkey", "CodeMonkey", "CodeMonkey is a fun and educational game environment where students learn to code in real programming languages, no previous experience needed.", "https://s3-us-west-2.amazonaws.com/cm-wordpress-media/wp-content/uploads/2018/06/12113810/CodeMonkey-Square-Logo.png"),
  (20038, "https://www.youtube.com/watch?v=2GBFDp02nU4", "3 Rules Beginning Screenwriters Need To Know - Dr. Ken Atchity", "YouTube", "BUY THE BOOK - A WRITER’S TIME: Making The Time To Writehttps://amzn.to/2GELyKWBUY THE BOOK - SELL YOUR STORY TO HOLLYWOOD: Writer’s Pocket Guide To The Busi...", "https://i.ytimg.com/vi/2GBFDp02nU4/maxresdefault.jpg"),
  (20038, "https://www.youtube.com/watch?v=OCPFxPQPDCg", "Screenwriting Tips from Hollywood Professionals", "YouTube", "Screenwriters of 'A Quiet Place', 'BlacKkKlansman', 'Uncle Drew', 'Nutcracker and the Four Realms' and more offer their best advice for writers trying to bre...", "https://i.ytimg.com/vi/OCPFxPQPDCg/maxresdefault.jpg"),
  (20038, "https://www.masterclass.com/articles/how-to-write-a-script", "Just a moment...", NULL, NULL, NULL),
  (20039, "https://www.betterup.com/blog/how-to-start-journaling", "How to Start Journaling: 7 Tips & Techniques for Beginners ", NULL, "Learning how to start journaling is a powerful self-improvement tool. Let’s explore the benefits of journaling and how to make it a ritual in your life.", "https://www.betterup.com/hubfs/Google%20Drive%20Integration/Delivery%20URL%20-%20BetterUp%20-%20how%20to%20start%20journaling%20%5BARTICLE%5D-1.png#keepProtocol"),
  (20039, "https://www.youtube.com/watch?v=dArgOrm98Bk", "The Journalling Techniques that Changed My Life", "YouTube", "9 Journalling Techniques that I've come across/up with over the past 12 years (using the double L spelling coz I'm Australian)Book links:Pre-Order (Internati...", "https://i.ytimg.com/vi/dArgOrm98Bk/maxresdefault.jpg"),
  (20040, "https://www.europarl.europa.eu/topics/en/article/20200827STO85804/what-is-artificial-intelligence-and-how-is-it-used", "What is artificial intelligence and how is it used? | Topics | European Parliament", "Topics | European Parliament", "Artificial intelligence (AI) is set to be a defining future technology, but what exactly is AI and how does it already affect our lives?", "https://www.europarl.europa.eu/resources/library/images/20200902PHT86210/20200902PHT86210_original.jpg"),
  (20040, "https://www.zdnet.com/article/what-is-ai-heres-everything-you-need-to-know-about-artificial-intelligence/", "What is AI? Everything to know about artificial intelligence", "ZDNET", "If you want to know about the fascinating and fast-developing technologies of artificial intelligence, we cover everything from machine learning and general AI to neural networks.", "https://www.zdnet.com/a/img/resize/55a40497249ba30536e06678ecd61b31986788bb/2023/04/12/532c92c3-6621-46a2-86d9-b022809c4a12/how-to-use-chatgpt.jpg?auto=webp&fit=crop&height=675&width=1200"),
  (20041, "https://www.finegardening.com/article/how-to-build-a-patio-in-a-weekend", "How to Build a Patio in a Weekend - FineGardening", "FineGardening", "Following these expert techniques, any gardener with realistic expectations on size and material can learn how to build a patio in a weekend.", "https://images.finegardening.com/app/uploads/2018/08/03154515/FG134MALead_Ctsy-Derek-Stearns-thumb-1x1.jpg"),
  (20041, "https://www.bhg.com/home-improvement/patio/installation-how-to/6-steps-patio/", "Upgrade Your Backyard with an Easy DIY Patio", "Better Homes & Gardens", "Our guide to patio installation has all the info you need to DIY a beautiful backyard living space. You'll want to entertain outside all summer long here.", "https://www.bhg.com/thmb/2KLUxXWiK15MMR0KpCzvvvnPOnU=/2000x0/filters:no_upscale():strip_icc()/paver-patio-2000-a471991a295c4335bac26bb076ecc08d.jpg");

INSERT INTO `favorites` (`user_id`, `shelf_id`)
VALUES
(10011, 20027),
(10011, 20029),
(10011, 20031),
(10011, 20036),
(10012, 20022),
(10012, 20024),
(10013, 20024),
(10013, 20025),
(10013, 20022),
(10013, 20038),
(10013, 20030),
(10014, 20023),
(10014, 20022),
(10015, 20025),
(10015, 20027),
(10015, 20026),
(10016, 20038),
(10016, 20036),
(10016, 20030);
