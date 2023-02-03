// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hackathon {
    struct Project {
        string title;
        uint[] ratings;
    }

    Project[] projects;

    function findWinner() external view returns (Project memory) {
        Project memory winnerProject;
        uint maxScore = 0;
        uint winner = 0;
        //function to iterate through the projects array,
        // calculate its average and return the winner with the highest average
        for (uint i = 0; i < projects.length; i++) {
            maxScore = _findAverage(projects[i].ratings);
            if (maxScore > winner) {
                winnerProject = projects[i];
                winner = maxScore;
            }
        }
        return winnerProject;
    }

    //function to iterate through the ratings of each project and return its average
    function _findAverage(uint[] memory _ratings) internal pure returns (uint) {
        uint score = 0;
        for (uint i = 0; i < _ratings.length; i++) {
            score += _ratings[i];
        }
        return score / _ratings.length;
    }

    function newProject(string calldata _title) external {
        // creates a new project with a title and an empty ratings array
        projects.push(Project(_title, new uint[](0)));
    }

    function rate(uint _idx, uint _rating) external {
        // rates a project by its index
        projects[_idx].ratings.push(_rating);
    }
}
