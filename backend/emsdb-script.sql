-- MySQL Script generated by MySQL Workbench
-- 05/01/17 09:46:09
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema emsdb
-- -----------------------------------------------------
-- The database for Mitrais Training Program Final Project. emsdb stands for Employee Management System Database.

-- -----------------------------------------------------
-- Schema emsdb
--
-- The database for Mitrais Training Program Final Project. emsdb stands for Employee Management System Database.
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `emsdb` DEFAULT CHARACTER SET utf8 ;
USE `emsdb` ;

-- -----------------------------------------------------
-- Table `emsdb`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emsdb`.`location` (
  `location_id` INT NOT NULL AUTO_INCREMENT,
  `location_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emsdb`.`division`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emsdb`.`division` (
  `division_id` INT NOT NULL AUTO_INCREMENT,
  `division_code` VARCHAR(16) NOT NULL,
  `division_name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`division_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emsdb`.`grade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emsdb`.`grade` (
  `grade_id` INT NOT NULL AUTO_INCREMENT,
  `grade_division_id` INT NOT NULL,
  `grade_code` VARCHAR(8) NOT NULL,
  `grade_name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`grade_id`, `grade_division_id`),
  INDEX `fk_grade_division1_idx` (`grade_division_id` ASC),
  CONSTRAINT `fk_grade_division1`
    FOREIGN KEY (`grade_division_id`)
    REFERENCES `emsdb`.`division` (`division_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emsdb`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emsdb`.`employee` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `employee_first_name` VARCHAR(64) NOT NULL,
  `employee_last_name` VARCHAR(128) NOT NULL,
  `employee_gender` VARCHAR(8) NOT NULL,
  `employee_photo` VARCHAR(256) NULL,
  `employee_email` VARCHAR(128) NOT NULL,
  `employee_status` VARCHAR(256) NULL,
  `employee_phone_no` VARCHAR(16) NULL,
  `employee_dob` DATETIME NULL,
  `employee_location_id` INT NOT NULL,
  `employee_hire_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(),
  `employee_suspend_date` DATETIME NULL,
  `employee_nationality` VARCHAR(45) NULL,
  `employee_marital_status` VARCHAR(45) NULL,
  `employee_division_id` INT NOT NULL,
  `employee_grade_id` INT NOT NULL,
  `employee_sub_division` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`employee_id`, `employee_location_id`, `employee_division_id`, `employee_grade_id`),
  INDEX `fk_employee_location_idx` (`employee_location_id` ASC),
  INDEX `fk_employee_division1_idx` (`employee_division_id` ASC),
  INDEX `fk_employee_grade1_idx` (`employee_grade_id` ASC),
  CONSTRAINT `fk_employee_location`
    FOREIGN KEY (`employee_location_id`)
    REFERENCES `emsdb`.`location` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_division1`
    FOREIGN KEY (`employee_division_id`)
    REFERENCES `emsdb`.`division` (`division_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employee_grade1`
    FOREIGN KEY (`employee_grade_id`)
    REFERENCES `emsdb`.`grade` (`grade_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `emsdb`.`location`
-- -----------------------------------------------------
START TRANSACTION;
USE `emsdb`;
INSERT INTO `emsdb`.`location` (`location_id`, `location_name`) VALUES (DEFAULT, 'Bali');
INSERT INTO `emsdb`.`location` (`location_id`, `location_name`) VALUES (DEFAULT, 'Jakarta');
INSERT INTO `emsdb`.`location` (`location_id`, `location_name`) VALUES (DEFAULT, 'Bandung');
INSERT INTO `emsdb`.`location` (`location_id`, `location_name`) VALUES (DEFAULT, 'Jogjakarta');
INSERT INTO `emsdb`.`location` (`location_id`, `location_name`) VALUES (DEFAULT, 'Vietnam');
INSERT INTO `emsdb`.`location` (`location_id`, `location_name`) VALUES (DEFAULT, 'Australia');

COMMIT;


-- -----------------------------------------------------
-- Data for table `emsdb`.`division`
-- -----------------------------------------------------
START TRANSACTION;
USE `emsdb`;
INSERT INTO `emsdb`.`division` (`division_id`, `division_code`, `division_name`) VALUES (1, 'SWD', 'Software Development');
INSERT INTO `emsdb`.`division` (`division_id`, `division_code`, `division_name`) VALUES (2, 'ADM', 'Administration');
INSERT INTO `emsdb`.`division` (`division_id`, `division_code`, `division_name`) VALUES (3, 'FNC', 'Finance');

COMMIT;


-- -----------------------------------------------------
-- Data for table `emsdb`.`grade`
-- -----------------------------------------------------
START TRANSACTION;
USE `emsdb`;
INSERT INTO `emsdb`.`grade` (`grade_id`, `grade_division_id`, `grade_code`, `grade_name`) VALUES (1, 1, 'JP', 'Junior Programmer');
INSERT INTO `emsdb`.`grade` (`grade_id`, `grade_division_id`, `grade_code`, `grade_name`) VALUES (2, 1, 'PG', 'Programmer');
INSERT INTO `emsdb`.`grade` (`grade_id`, `grade_division_id`, `grade_code`, `grade_name`) VALUES (3, 1, 'AP', 'Analyst Programmer');
INSERT INTO `emsdb`.`grade` (`grade_id`, `grade_division_id`, `grade_code`, `grade_name`) VALUES (4, 1, 'AN', 'Analyst');
INSERT INTO `emsdb`.`grade` (`grade_id`, `grade_division_id`, `grade_code`, `grade_name`) VALUES (5, 2, 'ADM-1', 'Administration Associate');
INSERT INTO `emsdb`.`grade` (`grade_id`, `grade_division_id`, `grade_code`, `grade_name`) VALUES (6, 2, 'ADM-2', 'Administrator');
INSERT INTO `emsdb`.`grade` (`grade_id`, `grade_division_id`, `grade_code`, `grade_name`) VALUES (7, 2, 'ADM-3', 'Senior Administrator');
INSERT INTO `emsdb`.`grade` (`grade_id`, `grade_division_id`, `grade_code`, `grade_name`) VALUES (8, 3, 'FNC-1', 'Financial Associate');
INSERT INTO `emsdb`.`grade` (`grade_id`, `grade_division_id`, `grade_code`, `grade_name`) VALUES (9, 3, 'FNC-2', 'Financial Assessor');
INSERT INTO `emsdb`.`grade` (`grade_id`, `grade_division_id`, `grade_code`, `grade_name`) VALUES (10, 3, 'FNC-3', 'Financial Planner');
INSERT INTO `emsdb`.`grade` (`grade_id`, `grade_division_id`, `grade_code`, `grade_name`) VALUES (11, 3, 'FNC-4', 'Senior Financial Planner');

COMMIT;


-- -----------------------------------------------------
-- Data for table `emsdb`.`employee`
-- -----------------------------------------------------
START TRANSACTION;
USE `emsdb`;
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Albert', 'Wesker', 'Male', 'wesker1.jpg', 'albert.wesker@mitrais.com', NULL, '+618173482291', '1990-05-09', 6, '2017-04-15', NULL, 'Australian', 'Single', 1, 3, 'Red');
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Chris', 'Redfield', 'Male', 'chris2.jpg', 'chris.redfield@mitrais.com', NULL, '+618118394223', '1992-12-12', 6, '2017-02-02', NULL, 'Australian', 'Single', 1, 3, 'Red');
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Claire', 'Redfield', 'Female', 'claire3.jpg', 'claire.redfield@mitrais.com', NULL, '+618137482371', '1994-09-01', 6, '2017-02-04', NULL, 'Australian', 'Single', 1, 2, 'Red');
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Barry', 'Burton', 'Male', 'barry4.jpg', 'barry.burton@mitrais.com', NULL, '+617483923839', '1990-04-12', 6, '2017-02-03', NULL, 'Australian', 'Married', 1, 2, 'Blue');
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Leon', 'Kennedy', 'Male', 'leon5.jpg', 'leon.skennedy@mitrais.com', NULL, '+654839200312', '1990-04-02', 3, '2016-08-09', NULL, 'Singaporean', 'Single', 1, 1, 'Blue');
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Christian', 'Johnson', 'Male', 'christian6.jpg', 'christian.johnson@mitrais.com', NULL, '+658123743921', '1986-02-02', 2, '2016-01-01', NULL, 'Singaporean', 'Widowed', 2, 5, '');
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Christy', 'Lionheart', 'Female', 'christy7.jpg', 'christy.lionheart@mitrais.com', NULL, '+627458394111', '1994-08-25', 2, '2016-02-04', NULL, 'Indonesian', 'Single', 3, 9, DEFAULT);
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Christopher', 'Atmadjaja', 'Male', 'christopher8.jpg', 'cristopher.atmadjaja@mitrais.com', NULL, '+628540091888', '1990-11-23', 1, '2015-01-23', NULL, 'Indonesian', 'Married', 3, 10, DEFAULT);
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Christian', 'Levi', 'Male', 'christian9.jpg', 'christian.levi@mitrais.com', NULL, '+628492391400', '1990-12-12', 4, '2015-02-02', NULL, 'Indonesian', 'Married', 1, 2, 'Yellow');
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Eli', 'Vance', 'Male', 'eli10.jpg', 'eli.vance@mitrais.com', NULL, '+652139384911', '1980-04-02', 5, '2015-10-10', NULL, 'Singaporean', 'Widowed', 2, 6, 'Special Administration');
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Linda', 'Lastri', 'Female', 'linda11.jpg', 'linda.lastri@mitrais.com', NULL, '+621473584399', '1994-05-06', 3, '2015-10-10', NULL, 'Indonesian', 'Single', 3, 10, DEFAULT);
INSERT INTO `emsdb`.`employee` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_gender`, `employee_photo`, `employee_email`, `employee_status`, `employee_phone_no`, `employee_dob`, `employee_location_id`, `employee_hire_date`, `employee_suspend_date`, `employee_nationality`, `employee_marital_status`, `employee_division_id`, `employee_grade_id`, `employee_sub_division`) VALUES (DEFAULT, 'Anna', 'Mariana', 'Female', 'anna12.jpg', 'anna.mariana@mitrais.com', NULL, '+623743831293', '1992-05-06', 4, '2015-10-10', NULL, 'Indonesian', 'Single', 1, 4, 'Yellow');

COMMIT;

