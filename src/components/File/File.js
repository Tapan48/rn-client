import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Pagination } from "antd";
import { Row, Col } from "antd";

import LineItem from "../Line/LineItem";
import LineFilters from "../Line/LineFilters";
import fileApi from "../../api/file";
import queryApi from "../../api/query";
import "./File.scss";

const File = () => {
  let params = useParams();
  let id = params.id;

  const [file, setFile] = useState([]);
  const [query, setQuery] = useState("");
  const [lines, setLines] = useState([]);

  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalResultsCount, setTotalResultsCount] = useState([]);

  const [orderBy, setOrderBy] = useState("score");
  const [arrangeBy, setArrangeBy] = useState("desc");

  useEffect(() => {
    queryApi
      .sendQuery({ id: file.file_id, query, offset: currentPage * pageSize, limit: pageSize, orderBy: orderBy, arrangeBy: arrangeBy })
      .then(res => {
        setLines(res.data);
        setTotalResultsCount(res.totalResultsCount);
      });
  }, [currentPage, orderBy, arrangeBy]);

  useEffect(() => {
    fileApi.getFileById(id).then(res => {
      setFile(res);
    });
  }, []);

  return (
    <div className="file-wrapper">
      <Row>
        <Col span={7}></Col>
        <Col span={12}>
          <div className="file-legend-info">
            <span>Name: {file?.name}</span>
            <span>Processed: {file.processed?.toString()}</span>
          </div>
          <input
            className="input-box-search-primary"
            type="search"
            onKeyPress={event => {
              if (event.key === "Enter") {
                console.log(`pressed enter: ${query}`);
                queryApi
                  .sendQuery({ id: file.file_id, offset: currentPage, limit: pageSize, query, orderBy: orderBy, arrangeBy: arrangeBy })
                  .then(res => {
                    setLines(res.data);
                    setTotalResultsCount(res.totalResultsCount);
                  });
              }
            }}
            onChange={event => {
              setQuery(event.target.value);
            }}></input>

          <div className="lines-table-wrapper">
            {lines.map(line => {
              return <LineItem key={line.file_line_id} line={line} />;
            })}
          </div>
          {lines.length > 0 && (
            <Pagination
              onChange={(page, _pageSize) => {
                setCurrentPage(page - 1);
                console.log(page);
              }}
              defaultCurrent={0}
              pageSize={pageSize}
              total={totalResultsCount}
            />
          )}
        </Col>
        <Col span={5}>
          <div className="lines-filter-dash">
            <LineFilters orderByChange={setOrderBy} arrangeByChange={setArrangeBy} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default File;
