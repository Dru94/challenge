import { useState } from "react";
import "./App.css";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

function App() {
  const [tags, setTags] = useState([]);
  const [fiterTags, setFilterTags] = useState([]);

  const tys = ["hairstyles", "makeup"];

  const getType = (ty) => {
    const type = ty.target.value;
    if (type !== "") {
      axios
        .get("http://localhost:8080/" + type)
        .then((res) => {
          if (res.status === 200) {
            setTags(res.data);
            console.log(res.data);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const filterTags = (t) => {
    const tagTarget = t.target.value;

    if (tagTarget !== "") {
      const newFilter = tags.filter((v) => v.includes(tagTarget));
      setFilterTags(newFilter);
    } else {
      setFilterTags([]);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <div className="dropDownDiv">
            <form method="post" style={{ width: "300px" }}>
              <label>Select Type: </label>
              <select onChange={getType}>
                <option value="">------</option>
                {tys.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
            </form>
            <div className="tagInputDiv">
              {" "}
              <label>Enter Tag: </label>
              <input onChange={filterTags} />
            </div>
          </div>
          <div className="tagsDiv">
            {fiterTags.map((e) => (
              <div className="filterDiv">
                <p>{e}</p>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
