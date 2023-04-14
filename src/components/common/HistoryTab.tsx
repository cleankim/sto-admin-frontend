import {Margin, Block} from "../../assets/GlobalStyle";
import {ListDatas} from "../../interface/ListDatas";
import Tabs, {TabProps} from "./Tabs";
import {useEffect, useState} from "react";
import List from "../common/List";

export type HistoryTabProps<T> = TabProps & ListDatas<T>;

export default function HistoryTab<T>({tabList, func, columns, list, totalCount}: HistoryTabProps<T>) {

    const [currentTab, setCurrentTab] = useState();
    const [listData, setListData] = useState({list: [], totalCount: 0});
    const tabClickEvent = (e: React.MouseEvent) => {
        const target = e.target as HTMLLIElement;

        console.log('target >>> ', target.getAttribute('data-type'));

        func(e);
    }

    useEffect(() => {}, [currentTab]);

    return (
      <Block>
          <h3>리스트</h3>
          <div>
              <Margin mb={20}>
                  <Tabs tabList={tabList} func={tabClickEvent}/>
              </Margin>
              <List columns={columns} totalCount={totalCount} list={list} />
          </div>
      </Block>
    );
}