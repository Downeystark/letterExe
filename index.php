<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <link href="index.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<textarea id="source" rows="20" cols="100" title="">
    <h1>dfdfd</h1>
    <div>sadfasdf</div>
    <h2>dfdfd</h2>
    <p>dfasdf</p>
    <img src="x1" alt="">
    <a href="">test</a>
    <div>sadfasdf</div>
    <ul class="search-nav">
        <li>asdf</li>
        </ul>
    <img src="x2" alt="">
    <?php if ($data['ca']["v"] == $_POST['av']['bv']): ?>
        <?php if ($data['cb']["v"] == $_POST['av']['bv']) { ?>
            asdfasd
        <?php } ?>
    <?php elseif (isset($data['m']["cc"])): ?>

    <?php else: ?>
        asdfa
    <?php endif; ?>



    <?php if ($data['cv']["v"] == $_POST['av']['bv'] && empty($data['ddd']) && !empty($data['ccc'])) { ?>
        asdfasd
        <?php foreach ($data['v']["cc"] as $k => $v) : ?>
            asdfa
            <?php foreach ($data['v']["cc"] as $k => $v) : ?>
                asdfa
            <?php endforeach; ?>
        <?php endforeach; ?>

    <?php } ?>

    <?= $data['v']["cc"] ?>
</textarea>

<textarea id="compiled" rows="20" cols="100" title=""></textarea>

<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="./MinProgramToH5.es5.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>

<script type="text/javascript">
    $(function () {

        var demo1 = new MinProgramToH5();

        $(`#source`).keyup(function () {
            demo1.string = $(this).val();
            demo1.Run();
            console.log(demo1.value)
            $('#compiled').val(demo1.value);
        });

    })
</script>
</body>
</html>