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
    `url` VARCHAR(255) NOT NULL,
    `item_add_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `shelf_id` BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (`shelf_id`) REFERENCES `shelves`(`shelf_id`) 
)
ENGINE=InnoDB AUTO_INCREMENT=30033;

CREATE TABLE `favorites` (
    `user_id` BIGINT UNSIGNED NOT NULL,
    `shelf_id`BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (`shelf_id`) REFERENCES `shelves`(`shelf_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);

--  Dummy data

-- USERS WITH SHELVES

-- log-in password is email address
INSERT INTO `users` (`first_name`, `last_name`, `user_bio`, `username`, `email`, `password`, `follower_count`)
VALUES
    ('Chandler', 'Bing', 'something cool and interesting', 'bing11', 'bing11@email.com', '$2b$12$m.3Ml/QjZcNsfFDTUBNv2O8KgnyGJ2/zwa8hQwLQ75A872hvAD8rG', 42), -- user 10011
    ('Phoebe', 'Buffay', 'something cool and interesting', 'buffay12', 'buffay12@email.com', '$2b$12$AVwrTO2kB94NrHuRkHIt1OYNj9eb/d.yC4Nv18kBZujMrBnpdZ/ui', 33), -- user 10012
    ('Rachel', 'Green', 'something cool and interesting', 'green13', 'green13@email.com', '$2b$12$nyekTjUF0aFmarW2s.WdMeF9RrZhbXsjcACqBRN5vOR0HlqdGzwe.', 38); -- user 10013

-- USERS WITH NO PUBLIC SHELVES

-- log-in password is email address
INSERT INTO `users` (`first_name`, `last_name`, `user_bio`, `username`, `email`, `password`)
VALUES
    ('Pam', 'Beesley', 'something cool and interesting', 'beesley14', 'beesley14@email.com', '$2b$12$0M2N7dl33ehyQ8EgXTstK..JnxuqV4GjNlRkN8Kk8ew.7Bl04Hn06'), -- user 10014
    ('Jim', 'Halpert', 'something cool and interesting', 'halpert15', 'halpert15@email.com', '$2b$12$L/RPK2zjHgI0Rem13A97keiCgeWjKn0ezDshSuscBDFPyfKpNgERG'), -- user 10015
    ('Monica', 'Geller', 'something cool and interesting', 'geller16', 'geller16@email.com', '$2b$12$DhE5s8TP3ex6K0vbiitNoudq4ud75AHaRv/NR1ApivfTRFymP9DS.'); -- user 10016

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

-- PUBLIC SHELVES
INSERT INTO `items` (`url`, `shelf_id`)
VALUES
-- 20022
('https://ordbokene.no/?ordbok=begge', 20022),
('https://open.spotify.com/show/2RODeyQhipqoLjfHmPGpiN', 20022),
('https://www.youtube.com/watch?v=uWQYqcFX8JE', 20022),
('https://www.youtube.com/watch?v=NPxOZD1Zyu0', 20022),
('https://www.youtube.com/watch?v=ft0TbsABuFY', 20022),
('https://www.lingohut.com/en/l87/learn-norwegian', 20022),
-- 20023
('https://www.youtube.com/watch?v=rfscVS0vtbw', 20023),
('https://www.learnpython.org/', 20023),
('https://www.dataquest.io/blog/learn-python-the-right-way/', 20023),
('https://www.w3schools.com/python/', 20023),
-- 20024
('https://www.youtube.com/watch?v=p_R1UDsNOMk', 20024),
('https://www.craftyarncouncil.com/standards/knitting-abbreviations', 20024),
('https://www.thesprucecrafts.com/knitting-4162934', 20024),
('https://sheepandstitch.com/how-to-knit/', 20024),
('https://sarahmaker.com/how-to-knit/', 20024),
('https://www.youtube.com/watch?v=Zjq0MoUZqVY', 20024),
-- 20025
('https://www.theclevercarrot.com/2014/01/sourdough-bread-a-beginners-guide/', 20025),
('https://www.theperfectloaf.com/best-sourdough-recipe/', 20025),
('https://www.theclevercarrot.com/category/sourdough-recipes/', 20025),
('https://simplytaralynn.com/2024/03/07/the-best-sourdough-bread-recipe-easy-for-beginners/', 20025),
-- 20026
('https://cakebycourtney.com/best-cakes-for-beginner-bakers/', 20026),
('https://www.youtube.com/watch?v=MjVgIXccYXA', 20026),
('https://www.youtube.com/watch?v=xdowDWYurzw', 20026),
('https://www.youtube.com/watch?v=VvJm4pQZ04s', 20026),
('https://www.youtube.com/watch?v=dd2V1tsgdVc', 20026),
('https://www.youtube.com/watch?v=iDcekQeBGOY', 20026),
-- 20027
('https://www.inspiredtaste.net/15938/easy-and-smooth-hummus-recipe/', 20027),
('https://thematbakh.com/best-traditional-lebanese-food-dishes/', 20027),
('https://maureenabood.com/lebanese-couscous-salad/', 20027),
('https://www.youtube.com/watch?v=PdGMnAt2sRY', 20027),
('https://www.youtube.com/watch?v=9RGbr9m-uCY', 20027),
('https://www.youtube.com/watch?v=s1Qsl5_-gFU', 20027),
-- 20030
('https://www.youtube.com/watch?v=eIrMbAQSU34', 20030),
('https://www.codecademy.com/learn/learn-java', 20030),
('https://www.youtube.com/watch?v=drQK8ciCAjY', 20030),
('https://www.youtube.com/watch?v=7WiJGTPuVeU', 20030),
('https://www.evergrowingdev.com/p/6-great-resources-to-learn-java-without', 20030),
('https://www.youtube.com/watch?v=A74TOX803D0', 20030),
-- 20031
('https://learngerman.dw.com/en/beginners/s-62078399', 20031),
('https://www.youtube.com/watch?v=PjdYxieJ5Oo', 20031),
('https://coerll.utexas.edu/dib/index.php', 20031),
('https://coerll.utexas.edu/gg/index.html', 20031),
-- 20036
('https://scratch.mit.edu/', 20036),
('https://www.coderobo.ai/', 20036),
('https://www.tynker.com/', 20036),
('https://www.youtube.com/watch?v=_j4Lj-BT00g', 20036),
('https://www.codemonkey.com/glp-coding-for-kids-abs/', 20036),
-- 20036
('https://www.youtube.com/watch?v=2GBFDp02nU4', 20038),
('https://www.youtube.com/watch?v=OCPFxPQPDCg', 20038),
('https://www.masterclass.com/articles/how-to-write-a-script', 20038);


    -- PRIVATE SHELVES
INSERT INTO `items` (`url`, `shelf_id`)
VALUES
-- 20039
('https://www.betterup.com/blog/how-to-start-journaling', 20039),
('https://www.youtube.com/watch?v=dArgOrm98Bk', 20039),
-- 20040
('https://www.europarl.europa.eu/topics/en/article/20200827STO85804/what-is-artificial-intelligence-and-how-is-it-used', 20040),
('https://www.zdnet.com/article/what-is-ai-heres-everything-you-need-to-know-about-artificial-intelligence/', 20040),
-- 20041
('https://www.finegardening.com/article/how-to-build-a-patio-in-a-weekend', 20041),
('https://www.bhg.com/home-improvement/patio/installation-how-to/6-steps-patio/', 20041);

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
