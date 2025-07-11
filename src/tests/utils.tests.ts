// Unit test of Utils class

import { describe, it, expect } from 'vitest';
import { verifyEmail, verifyGender, verifyName, verifyPassword } from '../utils/Utils';

describe("UtilsTests", () => {
    it("Test when name is legal. Should return true", () => {
        expect(verifyName("Test")).toEqual(true);
        expect(verifyName("Te")).toEqual(true);

        let longName = "a".repeat(80);
        expect(verifyName(longName)).toEqual(true);
    });
    
    it("Test when name is not legal. Should return false", () => {
        expect(verifyName("")).toEqual(false);
        expect(verifyName("a")).toEqual(false);

        let longName = "a".repeat(81);
        expect(verifyName(longName)).toEqual(false);
    });

    it("Test when email is legal. Should return true", () => {
        expect(verifyEmail("Test@test.com")).toEqual(true);
    });

    it("Test when email is not legal. Should return false", () => {
        // case empty
        expect(verifyEmail("")).toEqual(false);
        // case no '@'
        expect(verifyEmail("Testtest.com")).toEqual(false);
        // case no 'domain'
        expect(verifyEmail("Test@testcom")).toEqual(false);
    });

    it("Test when password is legal. Should return true", () => {
        expect(verifyPassword("12345678a@A")).toEqual(true);
        
        let longPwd = "a".repeat(30);
        expect(verifyName(longPwd)).toEqual(true);
    });

    it("Test when password is not legal. Should return false", () => {
        // case empty
        expect(verifyPassword("")).toEqual(false);
        // case too short
        expect(verifyPassword("Test")).toEqual(false);
        // case too long
        let longPwd = "a".repeat(31);
        expect(verifyPassword(longPwd)).toEqual(false);
        // case weak password
        expect(verifyPassword("12345678")).toEqual(false);
        expect(verifyPassword("Test1234")).toEqual(false);
        expect(verifyPassword("testtesttest")).toEqual(false);
        expect(verifyPassword("@@###ttest")).toEqual(false);
    });

    it("Test when Gender is legal. Should return true", () => {
        expect(verifyGender("male")).toEqual(true);
        expect(verifyGender("female")).toEqual(true);
    });    

    it("Test when Gender is not legal. Should return false", () => {
        expect(verifyGender("")).toEqual(false);
        expect(verifyGender("illeageValue")).toEqual(false);
    });
})