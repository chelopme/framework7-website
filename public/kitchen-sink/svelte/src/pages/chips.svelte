<script>
  import { f7, Navbar, Page, BlockTitle, Chip, Block } from 'framework7-svelte';

  function deleteChip(e) {
    const target = e.target;
    f7.dialog.confirm('Do you want to delete this tiny demo Chip?', () => {
      f7.$(target).parents('.chip').remove();
    });
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<Page>
  <Navbar title="Chips" backLink="Back" />
  <BlockTitle>Chips With Text</BlockTitle>
  <Block strongIos outlineIos>
    <Chip text="Example Chip" />
    <Chip text="Another Chip" />
    <Chip text="One More Chip" />
    <Chip text="Fourth Chip" />
    <Chip text="Last One" />
  </Block>
  <BlockTitle>Outline Chips</BlockTitle>
  <Block strongIos outlineIos>
    <Chip outline text="Example Chip" />
    <Chip outline text="Another Chip" />
    <Chip outline text="One More Chip" />
    <Chip outline text="Fourth Chip" />
    <Chip outline text="Last One" />
  </Block>
  <BlockTitle>Icon Chips</BlockTitle>
  <Block strongIos outlineIos>
    <Chip
      text="Add Contact"
      mediaBgColor="blue"
      iconIos="f7:plus_circle"
      iconMd="material:add_circle"
    />
    <Chip text="London" mediaBgColor="green" iconIos="f7:compass" iconMd="material:location_on" />
    <Chip text="John Doe" mediaBgColor="red" iconIos="f7:person" iconMd="material:person" />
  </Block>
  <BlockTitle>Contact Chips</BlockTitle>
  <Block strongIos outlineIos>
    <Chip text="Jane Doe">
      <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg" />
    </Chip>
    <Chip text="John Doe">
      <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-3.jpg" />
    </Chip>
    <Chip text="Adam Smith">
      <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg" />
    </Chip>
    <Chip text="Jennifer" mediaBgColor="pink" media="J" />
    <Chip text="Chris" mediaBgColor="yellow" mediaTextColor="black" media="C" />
    <Chip text="Kate" mediaBgColor="red" media="K" />
  </Block>
  <BlockTitle>Deletable Chips / Tags</BlockTitle>
  <Block strongIos outlineIos>
    <Chip text="Example Chip" deleteable onDelete={deleteChip} />
    <Chip
      text="Chris"
      media="C"
      mediaBgColor="orange"
      textColor="black"
      deleteable
      onDelete={deleteChip}
    />
    <Chip text="Jane Doe" deleteable onDelete={deleteChip}>
      <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-9.jpg" />
    </Chip>
    <Chip text="One More Chip" deleteable onDelete={deleteChip} />
    <Chip text="Jennifer" mediaBgColor="pink" media="J" deleteable onDelete={deleteChip} />
    <Chip text="Adam Smith" deleteable onDelete={deleteChip}>
      <img slot="media" src="https://cdn.framework7.io/placeholder/people-100x100-7.jpg" />
    </Chip>
  </Block>
  <BlockTitle>Color Chips</BlockTitle>
  <Block strongIos outlineIos>
    <Chip text="Red Chip" color="red" />
    <Chip text="Green Chip" color="green" />
    <Chip text="Blue Chip" color="blue" />
    <Chip text="Orange Chip" color="orange" />
    <Chip text="Pink Chip" color="pink" />
    <Chip outline text="Red Chip" color="red" />
    <Chip outline text="Green Chip" color="green" />
    <Chip outline text="Blue Chip" color="blue" />
    <Chip outline text="Orange Chip" color="orange" />
    <Chip outline text="Pink Chip" color="pink" />
  </Block>
</Page>
