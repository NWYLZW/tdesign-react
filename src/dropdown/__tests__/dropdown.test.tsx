import React from 'react';
import { testExamples, render, act, fireEvent, waitFor } from '@test/utils';
import Dropdown from '../Dropdown';
// 测试组件代码 Example 快照
testExamples(__dirname);
const { DropdownMenu, DropdownItem } = Dropdown;
describe('Dropdown 组件测试', () => {
  const triggerElement = '触发元素';
  const triggerElement2 = '触发元素2';
  const clickElement = '弹出层内容';
  const dropOptions = [
    {
      content: '弹出层内容',
      value: 1,
    },
    {
      content: '触发元素2',
      value: 4,
      children: [
        {
          content: '弹出层内容2-1',
          value: 11,
        },
      ],
    },
  ];

  test('hover 触发测试', async () => {
    const { getByText } = render(<Dropdown options={dropOptions}>{triggerElement}</Dropdown>);

    // 鼠标进入前，没有元素存在
    const popupContainer1 = await waitFor(() => document.querySelector('.t-dropdown'));
    expect(popupContainer1).toBeNull();

    // 模拟鼠标进入
    act(() => {
      fireEvent.mouseEnter(getByText(triggerElement));
      jest.runAllTimers();
    });

    // 鼠标进入后，有元素
    const popupContainer2 = await waitFor(() => document.querySelector('.t-dropdown__item'));
    expect(popupContainer2).toBeTruthy();
    expect(popupContainer2).toHaveTextContent(dropOptions[0].content);

    // 模拟鼠标进入child
    act(() => {
      fireEvent.mouseEnter(getByText(triggerElement2));
      jest.runAllTimers();
    });

    // 鼠标进入后，有元素
    const popupContainer4 = await waitFor(() => document.querySelectorAll('.t-dropdown__item'));
    expect(popupContainer4[2]).toBeTruthy();
    expect(popupContainer4[2]).toHaveTextContent(dropOptions[1].children[0].content);

    // 模拟鼠标离开
    act(() => {
      fireEvent.mouseLeave(getByText(triggerElement));
      jest.runAllTimers();
    });

    // 鼠标离开
    const popupContainer3 = await waitFor(() => document.querySelector('.t-dropdown__item-text'));
    expect(popupContainer3).toBeNull();
  });

  test('click 点击测试', async () => {
    const { getByText } = render(
      <Dropdown options={dropOptions}>
        {triggerElement}
      </Dropdown>,
    );

    // 鼠标进入前，没有元素存在
    const popupContainer1 = await waitFor(() => document.querySelector('.t-dropdown'));
    expect(popupContainer1).toBeNull();

    // 模拟鼠标进入
    act(() => {
      fireEvent.mouseEnter(getByText(triggerElement));
      jest.runAllTimers();
    });

    // 模拟鼠标点击
    act(() => {
      fireEvent.click(getByText(clickElement));
      jest.runAllTimers();
    });

    // 鼠标点击后下拉框消失
    const popupContainer3 = await waitFor(() => document.querySelector('.t-dropdown__item-text'));
    expect(popupContainer3).toBeNull();
  });
  test('child 写法模拟', async () => {
    const { getByText } = render(
      <Dropdown>
        {triggerElement}
        <DropdownMenu>
          <DropdownItem value={1}>弹出层内容</DropdownItem>
        </DropdownMenu>
      </Dropdown>,
    );

    // 鼠标进入前，没有元素存在
    const popupContainer1 = await waitFor(() => document.querySelector('.t-dropdown'));
    expect(popupContainer1).toBeNull();

    // 模拟鼠标进入
    act(() => {
      fireEvent.mouseEnter(getByText(triggerElement));
      jest.runAllTimers();
    });

    // 模拟鼠标离开
    act(() => {
      fireEvent.mouseLeave(getByText(triggerElement));
      jest.runAllTimers();
    });

    // 鼠标点击后下拉框消失
    const popupContainer3 = await waitFor(() => document.querySelector('.t-dropdown__item-text'));
    expect(popupContainer3).toBeNull();
  });
});
