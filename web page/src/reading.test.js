/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
  });


import jsPsych from 'pushkin-jspsych';
import timeline from './experiment.js';

const mockTimelineVariable = jest.fn();

// Mock the jsPsych object and the timelineVariable function
global.jsPsych = {
  timelineVariable: mockTimelineVariable
};

// Your experiment code would go here...
var trial = {
  timeline: [
      {
          type: 'html-keyboard-response',
          stimulus: '<div>Press spacebar when you are ready to read some text.</div>',
      },
      {
          type: 'moving-window',
          words: mockTimelineVariable('sentence'),
      }
  ]
}


describe('Experiment', () => {
  test('should create a timeline with the correct length', () => {
    expect(timeline.length).toBe(4);
  });

  test('should create a welcome message with the correct type', () => {
    expect(timeline[0].type).toBe('html-keyboard-response');
  });

  test('should create instructions with the correct type', () => {
    expect(timeline[1].type).toBe('html-keyboard-response');
  });

  test('should create a trial with the correct type', () => {
    expect(timeline[2].timeline[0].type).toBe('html-keyboard-response');
    expect(timeline[2].timeline[1].type).toBe('moving-window');
  });
  test('should create a trial with the rate', () => {
    expect(timeline[2].timeline[1].rate).toBe('movingword');
  });

  test('jsPsych.timelineVariable is called with "sentence"', () => {
    expect(mockTimelineVariable).toHaveBeenCalledWith('sentence');
  });

  test('should create a summary with the correct type', () => {
    expect(timeline[3].type).toBe('html-keyboard-response');
  });
});
