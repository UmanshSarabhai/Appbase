
import React from 'react';
import ReactDOM from 'react-dom';

import {
	ReactiveBase,
	DataSearch,
	MultiList,
	SelectedFilters,
	ReactiveList
} from '@appbaseio/reactivesearch';
import {
	Row,
	Button,
	Col,
	Card,
	Switch,
	Tree,
	Popover,
	Affix
} from 'antd';
import 'antd/dist/antd.css';


import ExpandCollapse from 'react-expand-collapse';

import './styles.css';

const { TreeNode } = Tree;

const renderAsTree = (res, key = '0') => {
	if (!res) return null;
	const iterable = Array.isArray(res) ? res : Object.keys(res);
	return iterable.map((item, index) => {
		const type = typeof res[item];
		if (type === 'string' || type === 'number') {
			return (
				<TreeNode
					title={
						<div>
							<span>{item}:</span>&nbsp;
							<span dangerouslySetInnerHTML={{ __html: res[item] }} />
						</div>
					}
					key={key + "-" + (index + 1)}
				/>
			);
		}
		const hasObject = (res[item] === undefined && typeof item !== 'string');
		const node = hasObject ? item : res[item];
		return (
			<TreeNode
				title={typeof item !== 'string' ? 'Object' : '' + (node || Array.isArray(res) ? item : item + ': null')}
				key={key + "-" + (index + 1)}
			>
				{renderAsTree(node, key + "-" + (index + 1))}
			</TreeNode>
		);
	});
};

function renderItem(res, triggerClickAnalytics) {
	return (
		<div onClick={triggerClickAnalytics} className="list-item" key={res._id}>
			<ExpandCollapse
				previewHeight="390px"
				expandText="Show more"
			>
				{
					<Tree showLine>
						{renderAsTree(res)}
					</Tree>
				}
			</ExpandCollapse>
		</div>
	);
};

const App = () => (
	<ReactiveBase
		app="New_01"
		credentials="9CtdLdLKF:165aef2e-9ad3-4df1-8d5b-a90fa98c2423"
		url="https://scalr.api.appbase.io"
		analytics={true}
		searchStateHeader
	>
		<Row gutter={16} style={{ padding: 20 }}>
			<Col span={12}>
				<Card>
				<MultiList
				  componentId="list-1"
				  dataField="brand.keyword"
				  queryFormat="and"
				  size={100}
				  style={{
				    marginBottom: 20
				  }}
				  title="Brand"
				/>
				</Card>
			</Col>
			<Col span={12}>
				<DataSearch
				  componentId="search"
				  dataField={[
				    'description',
				    'description.keyword',
				    'product_name',
				    'product_name.keyword'
				  ]}
				  fieldWeights={[
				    1,
				    1,
				    1,
				    1
				  ]}
				  fuzziness={1}
				  highlight={true}
				  highlightField={[
				    'description',
				    'product_name'
				  ]}
				  placeholder="Search here..."
				  queryFormat="and"
				  style={{
				    marginBottom: 20
				  }}
				  title="#1"
				/>

				<SelectedFilters />
				<div id="result">
					<ReactiveList
				  componentId="result"
				  dataField="brand.keyword"
				  pagination={true}
				  react={{
				    and: [
				      'search',
				      'list-1'
				    ]
				  }}
				  renderItem={renderItem}
				  size={10}
				  style={{
				    marginTop: 20
				  }}
				/>
				</div>
			</Col>
			
		</Row>
	</ReactiveBase>
);

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
