import React, { Component } from 'react';
import Crumb from '../Breadcrumb/Crumb';
import { Input, Icon, Tooltip, Button } from 'antd';

const items = [<a href="/">Projects</a>,
<a href="/">New Projects</a>
]

const { TextArea } = Input

class NewProject extends Component {


    state = {
        name: '',
        description: '',
    }

    onNameChange = ({ target: { value } }) => {
        this.setState({ name: value });
    }

    onDescriptionChange = ({ target: { value } }) => {
        this.setState({ description: value })
    }

    render() {
        const { name, description } = this.state;
        return (
            <div>
                <Crumb items={items} />
                <form className="mt-4" onSubmit={(e) => console.log(e)}>
                    <div class="form-group">
                        <label htmlFor="projectName">Project Name</label>
                        <Input
                            onChange={this.onNameChange}
                            placeholder="Project Name"
                            id="projectName"
                            value={name}
                            prefix={<Icon type="folder" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={
                                <Tooltip title="Extra information">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                        <small class="form-text text-muted">The project name will be know to every single person you're sharing it with</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="projectDescription">Description</label>
                        <TextArea
                            onChange={this.onDescriptionChange}
                            placeholder="Description"
                            id="projectDescription"
                            value={description}
                            autosize={{ minRows: 4 }}
                        >
                        </TextArea>
                    </div>

                    <div className="form-group float-right">
                        <Button type="primary">Create Project</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewProject;