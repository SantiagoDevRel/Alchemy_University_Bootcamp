// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
    event ProposalCreated(uint);
    event VoteCast(uint, address indexed);

    enum Vote {
        Absent,
        Yes,
        No
    }
    uint public constant VOTING_THRESHOLD = 10;

    struct Proposal {
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
        mapping(address => Vote) votes;
        bool executed;
    }

    Proposal[] public proposals;
    mapping(address => bool) public members;

    constructor(address[] memory _members) {
        //add the addresses to the mapping of the members (true)
        for (uint i = 0; i < _members.length; i++) {
            members[_members[i]] = true;
        }
        members[msg.sender] = true;
    }

    modifier onlyMembers() {
        require(members[msg.sender], "Not allowed");
        _;
    }

    //create new struct Proposal and add it to the array
    function newProposal(
        address _target,
        bytes calldata _data
    ) external onlyMembers {
        emit ProposalCreated(proposals.length);

        //this is the ONLY way to create a struct with mapping and push it into an array
        Proposal storage newProp = proposals.push();

        //then edit the struct
        newProp.target = _target;
        newProp.data = _data;
    }

    //vote, each address can vote only 1 time and can change their vote
    //after the votes reaches the VOTING_THRESHOLD, the proposal will be executed
    function castVote(uint _id, bool _vote) external onlyMembers {
        if (proposals[_id].votes[msg.sender] == Vote.Absent) {
            if (_vote) {
                proposals[_id].yesCount++;
                proposals[_id].votes[msg.sender] = Vote.Yes;
            } else {
                proposals[_id].noCount++;
                proposals[_id].votes[msg.sender] = Vote.No;
            }
        } else {
            if (proposals[_id].votes[msg.sender] == Vote.Yes) {
                if (!_vote) {
                    proposals[_id].votes[msg.sender] = Vote.No;
                    proposals[_id].noCount++;
                    proposals[_id].yesCount--;
                }
            }

            if (proposals[_id].votes[msg.sender] == Vote.No) {
                if (_vote) {
                    proposals[_id].votes[msg.sender] = Vote.Yes;
                    proposals[_id].noCount--;
                    proposals[_id].yesCount++;
                }
            }
        }
        emit VoteCast(_id, msg.sender);
        if (
            proposals[_id].yesCount == VOTING_THRESHOLD &&
            !proposals[_id].executed
        ) {
            address _target = proposals[_id].target;
            bytes memory _data = proposals[_id].data;

            (bool success, ) = _target.call(_data);
            proposals[_id].executed = true;
            require(success);
        }
    }
}
