PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    TEXT PRIMARY KEY NOT NULL,
    "checksum"              TEXT NOT NULL,
    "finished_at"           DATETIME,
    "migration_name"        TEXT NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        DATETIME,
    "started_at"            DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count"   INTEGER UNSIGNED NOT NULL DEFAULT 0
);
INSERT INTO _prisma_migrations VALUES('5cb81896-8013-4028-88c5-9133d60efb38','b259dae9e98241218767acafae4f578757ec55067bc988e19633f7e646a6546b',1727791373963,'20220713162558_init',NULL,NULL,1727791373957,1);
INSERT INTO _prisma_migrations VALUES('509219b4-804c-4257-853d-87d31d7c27bc','b3b5d040fda9f3ea443e539ba44cffb01e22fdb0d869eff0a2d28fbead5fbd1a',1727792070136,'20241001141430_update_technique_model',NULL,NULL,1727792070133,1);
INSERT INTO _prisma_migrations VALUES('9fe28e71-2e35-44e7-8fc2-dcfe859b25ae','aa11c72f83c6d26f12d1b713afbbc18f65894d86404b1f2115a312cfd40816ce',1727965883205,'20241003143123_add_updated_at_and_user_id_to_technique',NULL,NULL,1727965883200,1);
INSERT INTO _prisma_migrations VALUES('0677e10f-6841-4b4a-b374-ce6b046dfe44','ff997960c3d8bd55894865975483392b2a23f124d89d569a1a11de6bb104c822',1727966572237,'20241003144252_make_user_id_required_in_technique',NULL,NULL,1727966572230,1);
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO User VALUES('cm1temz600000al45x8z7rwze','rob@razorhollow.com',1727966498182,1727966498182);
CREATE TABLE IF NOT EXISTS "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO Password VALUES('$2a$10$PWwaMLjwnpN467.sXnkBf.spaZqxfuY0oavpPH.6KnNbtEqVO9r4m','cm1temz600000al45x8z7rwze');
CREATE TABLE IF NOT EXISTS "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO Note VALUES('cm1temz6p0002al45wk6kf1oh','My first note','Hello, world!',1727966498209,1727966498209,'cm1temz600000al45x8z7rwze');
INSERT INTO Note VALUES('cm1temz6r0004al45p3pgmevt','My second note','Hello, world!',1727966498212,1727966498212,'cm1temz600000al45x8z7rwze');
CREATE TABLE IF NOT EXISTS "Technique" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "videoLink" TEXT,
    "lastIntroduced" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Technique_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO Technique VALUES(81,'Rear Naked Choke','','Back Control',NULL,1718582400000,1727966498216,1727966498216,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(82,'Side Scissor to Armbar / Triangle','','Closed Guard','',1718755200000,1727966498219,1729106131067,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(83,'Bow and Arrow Choke','','Back Control',NULL,1718928000000,1727966498221,1727966498221,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(84,'Cross Collar Choke','','Closed Guard',NULL,1719187200000,1727966498223,1727966498223,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(85,'Wizzer Trap Sequence','','Closed Guard',NULL,1719360000000,1727966498225,1727966498225,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(86,'Clamp Armbar','','Closed Guard',NULL,1719532800000,1727966498227,1727966498227,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(87,'Americana','','Mount Top','',1719792000000,1727966498228,1729106677655,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(88,'Cross Collar Choke','','Mount',NULL,1719964800000,1727966498230,1727966498230,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(89,'Armbar / Triangle Gauging Reactions','','Mount',NULL,1720137600000,1727966498231,1727966498231,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(90,'Kata Gatame','','Side Control',NULL,1720396800000,1727966498232,1727966498232,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(91,'Scarf Choke and Progression','','Side Control',NULL,1720569600000,1727966498234,1727966498234,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(92,'Armbar / Kimura','','North South',NULL,1720742400000,1727966498236,1727966498236,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(93,'Toreando and Jimmy Pass','','Guard Passing',NULL,1721001600000,1727966498237,1727966498237,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(94,'Over/Under and Stack Pass','','Guard Passing',NULL,1721174400000,1727966498239,1727966498239,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(95,'Double Under / Double Under Back Take','','Guard Passing',NULL,1721347200000,1727966498240,1727966498240,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(96,'DLR Guard Sweep Options (Basic, Getup, Crab Ride)','','De La Riva Guard',NULL,1721606400000,1727966498242,1727966498242,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(97,'Baited Sweep','','Spider Guard',NULL,1721779200000,1727966498243,1727966498243,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(98,'Hip Kick Sweep','','Lasso Guard',NULL,1721952000000,1727966498244,1727966498244,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(99,'Triangle Tips and Tricks','','Closed Guard',NULL,1722211200000,1727966498246,1727966498246,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(100,'Ezekiel Choke','','3/4 Mount',NULL,1722384000000,1727966498247,1727966498247,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(101,'Kimura','','Top Half Guard',NULL,1722556800000,1727966498249,1727966498249,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(102,'Back Door Shoulder Lock','','Side Control Bottom',NULL,1722816000000,1727966498250,1727966498250,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(103,'Knee Grab Half Guard Recovery','','Side Control Bottom',NULL,1722988800000,1727966498252,1727966498252,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(104,'Back Door D''Arce Escape','','Side Control Bottom',NULL,1723161600000,1727966498253,1727966498253,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(105,'High Knee North South Escape','','North South Bottom',NULL,1723593600000,1727966498255,1727966498255,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(106,'North South Variations: Double Over, Alternate to High Knee','','North South Bottom',NULL,1723766400000,1727966498256,1727966498256,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(107,'Makikomi Roll Through Sweep','','Turtle Bottom',NULL,1724025600000,1727966498257,1727966498257,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(108,'Single Leg Turtle Escape','','Turtle Bottom',NULL,1724198400000,1727966498259,1727966498259,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(109,'Granby Roll Escape','','Turtle Bottom',NULL,1724371200000,1727966498260,1727966498260,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(110,'Knee on Belly Fundamentals','','Knee on Belly',NULL,1724630400000,1727966498262,1727966498262,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(111,'Baseball Choke','','Knee on Belly',NULL,1724803200000,1727966498263,1727966498263,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(112,'Elbow Control Arm Lock','','Knee on Belly',NULL,1724976000000,1727966498265,1727966498265,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(113,'Adamir Turtle Attacks','','Turtle Top',NULL,1725840000000,1727966498266,1727966498266,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(114,'Adamir Turtle Attacks','','Turtle Top',NULL,1726012800000,1727966498268,1727966498268,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(115,'Near Side Turtle Back Take','','Turtle Top',NULL,1726444800000,1727966498269,1727966498269,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(116,'Toreando Spider Defense','','Guard Retention',NULL,1726617600000,1727966498271,1727966498271,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(117,'Toreando Collar Drag','','Guard Retention',NULL,1726790400000,1727966498272,1727966498272,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(118,'Toreando Sleeve Grab Roll Sweep','','Guard Retention',NULL,1727049600000,1727966498273,1727966498273,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(119,'Toreando Knee Brace Lasso','','Guard Retention',NULL,1727222400000,1727966498275,1727966498275,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(120,'Head Control Concept','','Guard Retention',NULL,1727395200000,1727966498276,1727966498276,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(121,'Straight Arm Lock','Use underhook shoulder crunch to initiate sequence. Pinch their arm between your ear and shoulder to maintain control.','Butterfly','',1728864000000,1728928100472,1729015618157,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(122,'Hook Sweep','Control sweep side arm, either by grabbing wrist and pushing inward, or getting overhook and controlling triceps. Fall to the side, not back','Butterfly','',1728604800000,1728928760647,1729015506843,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(123,'Glick Defense','First Option: Pop the elbow to hyperextend. Normal reaction is to collapse forearm into chest. From here, double up on elbow and push to oposite side, opening up side scissor','Closed Guard','',1728259200000,1729015446131,1729015446131,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(124,'Knee Shield Sweep / Counter Sweep','Top hand gets sleeve grip, bottom hand gets knee. Same motion as balloon sweep. If partner resists, sweep the opposite way','Half Guard Bottom','',1728432000000,1729015875981,1729015875981,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(125,'Cross Sleeve Control to Triangle / Arm Bar','Adamir Private. cross sleeve plus bat wing pull. Feet on the hips push. Push knee on opposite side to break partner down and base on their hands. This opens up the triangle, and also the rolling armbar (shin on partners neck)','Open Guard','',1728000000000,1729016020668,1729016020668,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(126,'Butterfly Base Concept','Hip Position and Shoulder Rotation Principle. Get partners hips over your hips, and rotate their shoulders to start the hook sweep and exert less pressure with legs','Butterfly','',1729036800000,1729106057725,1729106057725,'cm1temz600000al45x8z7rwze');
INSERT INTO Technique VALUES(127,'butterfly to x guard sweep','Pull to supine position, pulling partners legs up in the air, if they base, transition to x. If they don''t react, rotate and sweep','Butterfly','',1729209600000,1729264251341,1729264251341,'cm1temz600000al45x8z7rwze');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Technique',127);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");
COMMIT;
