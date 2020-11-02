import { useState } from "react";
import React from 'react';
import Card from 'react-bootstrap/Card';
import ReactMarkdown from "react-markdown";
import CollectionNav from '@mura/CollectionNav/CollectionNav';
import ItemDate from '@mura/Utilities/ItemDate';
import CollectionReadMoreBtn from '@mura/Utilities/CollectionReadMoreBtn';
/*
  The link component throws an error when rerending after being 
  reconfigured in edit mode. Hence CollectionLink
*/
const Masonry = ({props,collection,link}) => {
  const [pos, setPos] = useState(0);
  return (
    <>
      <div className={`collectionLayoutMasonry card-columns`}>
          <CurrentItems collection={collection} pos={pos} link={link} {...props} /> 
      </div>
      <div className="row">
        <div className="col-12">
        <CollectionNav collection={collection} pos={pos} setPos={setPos} link={link} {...props} />
        </div>
      </div>
    </>
  )
}

const CurrentItems = (props) => {
  const {collection,nextn,link,pos,fields} = props;
  let itemsList = [];
  let item = '';
  const Link = link;
  const items = collection.get('items');
  const itemsTo = pos+nextn > items.length ? items.length : pos+nextn;
  const fieldlist = fields ? fields.toLowerCase().split(",") : [];
  // console.log(fieldlist);

  for(let i = pos;i < itemsTo;i++) {
    item = items[i];
    itemsList.push(
      
      <Card className="mb-3 h-100 shadow" key={item.get('contentid')}>
        <Card.Img variant="top" src={item.get('images')[props.imagesize]} />
        <Card.Body>
          <div className="mura-item-meta">
            {
            fieldlist.map(field => {
              switch(field) {
                case "title":
                  return (
                    <Card.Title key={field}>{item.get('title')}</Card.Title>
                  )
                case "date":
                    return (
                      <div className="mura-item-meta__date" key="date">
                        <ItemDate releasedate={item.get('releasedate')} lastupdate={item.get('lastupdate')}></ItemDate>
                      </div>
                    );
                case "summary":
                  return <ReactMarkdown source={item.get('summary')} key={field} />
                default:
                  return <div className={`mura-item-meta__${field}`} key={field} data-value={item.get(field)}>{item.get(field)}</div>
              }        
            })
            }
          </div>
        </Card.Body>
        <Card.Footer>
          <CollectionReadMoreBtn
            href={`/${item.get('filename')}`}
            ctatext="Read More"
            link={Link}
            key={item.get('contentid')}
          />
        </Card.Footer>

      </Card>
    );
  }

  return itemsList;
}

/*
  This is not required; it is used to retrieve the required fields when populated getStatic/getServerSide props
*/
export const getQueryProps = () => {
  const data = {};
  data['fields'] = "title,summary";

  return data;
};

export default Masonry;