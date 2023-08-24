<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "//www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title> Sale return report pdf</title>
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon.ico') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <!-- General CSS Files -->
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
</head>
<body>
<table width="100%" cellspacing="0" cellpadding="10" style="margin-top: 40px;">
    <thead>
    <tr style="background-color: dodgerblue;">
        <th style="width: 200%">Warehouse</th>
        <th style="width: 200%">code</th>
        <th style="width: 300%">Name</th>
        <th style="width: 200%">Cost</th>
        <th style="width: 200%">Price</th>
        <th style="width: 250%">Current Stock</th>
    </tr>
    </thead>
    <tbody>
    @foreach($stocks  as $stock)
        <tr align="center">
            <td>{{$stock->warehouse->name}}</td>
            <td>{{$stock->product->code}}</td>
            <td>{{$stock->product->name}}</td>
            <td>{{number_format($stock->product->product_cost,2)}}</td>
            <td>{{number_format($stock->product->product_price,2)}}</td>
            <td>{{ $stock->quantity }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
