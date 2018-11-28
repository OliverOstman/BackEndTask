SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `bc_media` (
  `mID` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` text NOT NULL,
  `title` text NOT NULL,
  `details` text NOT NULL,
  `coordinates` text NOT NULL,
  `thumbnail` text NOT NULL,
  `image` text NOT NULL,
  `original` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


ALTER TABLE `bc_media`
  ADD PRIMARY KEY (`mID`);


ALTER TABLE `bc_media`
  MODIFY `mID` int(11) NOT NULL AUTO_INCREMENT;
