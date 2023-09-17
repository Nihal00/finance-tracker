import React from 'react';
import { Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { btn, cardInput } from '../style';


const AddExpense = ({ isExpenseModalVisible, handleExpModal, onFinish }) => {

    const [form] = Form.useForm();

    return (
        <Modal
            title="Add Expense"
            visible={isExpenseModalVisible}
            onCancel={handleExpModal}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(value) => {
                    onFinish(value, "expense");
                    form.resetFields();
                }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the name of the transaction!",
                        },
                    ]}
                >
                    <Input type="text" className={`${cardInput.inputs}`}  />
                </Form.Item>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Please input the expense amount!",
                        },
                    ]}
                >
                    <Input type="number" className={`${cardInput.inputs}`} />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: "Please select the date!",
                        },
                    ]}
                >
                    <DatePicker format="YYYY-MM-DD" className={`${cardInput.inputs}`}  />
                </Form.Item>
                <Form.Item
                    label="Tag"
                    name="tag"
                    rules={[
                        {
                            required: true,
                            message: "Please choose a tag!"
                        }
                    ]}
                >
                    <Select>
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="education">Education</Select.Option>
                        <Select.Option value="office">Office</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button className={`${btn.btnActive}`} type="primary" htmlType="submit">Add Expense</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddExpense
