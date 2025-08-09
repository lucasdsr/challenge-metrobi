import { Column, Row, Zenos } from "../index";

import styles from "./index.module.css";

export const FlexLayout = () => (
  <Column className={styles.container}>
    <Row className={styles.header}>
      <h1>Header</h1>
    </Row>
    <Row className={styles.seccond_row}>
      <Column className={styles.left_column}>
        <Row className={styles.hero}>
          <h1>Hero</h1>
        </Row>
        <Row className={styles.sidebar}>
          <h1>Sidebar</h1>
        </Row>
      </Column>
      <Column className={styles.right_column}>
        <Row className={styles.main}>
          <Column className={styles.main_content}>
            <Column className={styles.title}>
              <h1>Main Content</h1>
              <h2>
                **If things do not look right, make sure your browser is in
                "Experimental mode"**
              </h2>
            </Column>
            <Row className={styles.zenos}>
              <Zenos />
            </Row>
          </Column>
        </Row>
        <Row className={styles.extra}>
          <h1>Extra Content</h1>
        </Row>
      </Column>
    </Row>
    <Row className={styles.third_row}>
      <Column className={styles.related_images}>
        <h1>Related Images</h1>
      </Column>
      <Column className={styles.related_posts}>
        <h1>Related Posts</h1>
      </Column>
    </Row>
    <Row className={styles.footer}>
      <h1>Footer</h1>
    </Row>
  </Column>
);

export default FlexLayout;
